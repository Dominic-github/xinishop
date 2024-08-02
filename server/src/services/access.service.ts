import bcrypt from 'bcrypt'
import crypto from 'crypto'
import TokenService from '../services/token.service'
import { createTokenPair } from '~/helpers/jwt.helper'
import {
  Api403Error,
  BusinessLogicError,
  Api401Error
} from '../core/error.response'
import { translate } from '~/utils/i18next.util'
import { findByEmail } from './shop.service'
import { getInfoData } from '~/utils'
import type { IKeyStore } from '~/interfaces/iKeyStore.interface'
import prisma from '~/models/client'

export const RoleShop = {
  SHOP: 'SHOP',
  WRITER: '001',
  READ: '002',
  DELETE: '003',
  ADMIN: '000'
}

class AccessService {
  /**
   * 1 - Check email in dbs
   * 2 - Match password
   * 3 - Create AT vs RT and save
   * 4 - Generate tokens
   * 5 - Get guide return login
   *
   * @param email
   * @param password
   * @returns {Promise<void>}
   */
  signIn = async ({ email, password }: { email: string; password: string }) => {
    // 1.
    const foundShop = await findByEmail(email)

    if (!foundShop) throw new Api403Error(translate('messages.error002'))

    // 2.
    const match = bcrypt.compare(password, foundShop.shop_password)
    if (!match) throw new BusinessLogicError(translate('messages.error003'))

    // 3. create private key, public key
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
      }
    })

    // 4. generate tokens
    const { shop_id } = foundShop
    const tokens = await createTokenPair(
      {
        userId: shop_id,
        email
      },
      publicKey,
      privateKey
    )
    if (!tokens) throw new Api403Error(translate('messages.error002'))

    await TokenService.createKeyToken({
      userId: shop_id,
      privateKey,
      publicKey,
      refreshToken: tokens.refreshToken
    })

    //
    return {
      shop: getInfoData({
        fields: ['shop_id', 'shop_name', 'shop_email'],
        object: foundShop
      }),
      tokens
    }
  }

  /**
   * Check this token used?
   * @param refreshToken
   * @param user
   * @param keyStore
   * @returns {Promise<void>}
   */
  refreshToken = async ({
    refreshToken,
    user,
    keyStore
  }: {
    refreshToken: string
    user: any
    keyStore: IKeyStore
  }) => {
    const { userId, email } = user

    if (keyStore.refresh_token_used.includes(refreshToken)) {
      await TokenService.deleteKeyById(userId)
      throw new Api403Error(translate('messages.error001'))
    }

    if (refreshToken !== keyStore.refresh_token)
      throw new Api401Error(translate('messages.error002'))

    // check userId
    const foundShop = await findByEmail(email)
    if (!foundShop) throw new Api401Error(translate('messages.error000'))

    // create accessToken, refreshToken
    const tokens = await createTokenPair(
      {
        userId: userId,
        email: email
      },
      keyStore.public_key,
      keyStore.private_key
    )

    const refreshTokensUsed = [...keyStore.refresh_token_used, refreshToken]

    // update token
    await prisma.token.update({
      where: { user_id: userId },
      data: {
        refresh_token: tokens?.refreshToken,
        refresh_token_used: refreshTokensUsed
      }
    })

    // return new tokens
    return {
      user,
      tokens
    }
  }
  /**
   * Action logout
   *
   * @param keyStore
   * @returns {Promise<*>}
   */
  logout = async (keyStore: IKeyStore) => {
    const delKey = await TokenService.deleteKeyById(keyStore.user_id)
    console.debug(delKey)
    return delKey
  }

  signUp = async ({
    name,
    email,
    password,
    msisdn
  }: {
    name: string
    email: string
    password: string
    msisdn: string
  }) => {
    // step1: check email exists?
    const holderShop = await prisma.shop.findUnique({
      where: { shop_email: email }
    })

    if (holderShop) {
      throw new Api403Error(translate('messages.error004'))
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newShop = await prisma.shop.create({
      data: {
        shop_name: name,
        shop_email: email,
        shop_password: passwordHash,
        shop_msisdn: msisdn
      }
    })

    if (!newShop) {
      return {}
    }

    // create private key, public key
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    })

    const publicKeyString = await TokenService.createKeyToken({
      userId: newShop.shop_id,
      publicKey: publicKey,
      privateKey: privateKey,
      refreshToken: ''
    })

    if (!publicKeyString) {
      throw new BusinessLogicError(translate('messages.error005'))
    }

    // create pub
    const publicKeyObject: any = await crypto.createPublicKey(publicKeyString)

    // created token pair
    const tokens = await createTokenPair(
      {
        userId: newShop.shop_id,
        email
      },
      publicKeyObject,
      privateKey
    )

    // apiKey
    const newKey = await prisma.apiKey.create({
      data: {
        key: crypto.randomBytes(64).toString('hex'),
        permissions: ['0000']
      }
    })

    return {
      shop: getInfoData({
        fields: ['shop_id', 'shop_name', 'shop_email', 'shop_msisdn'],
        object: newShop
      }),
      tokens: tokens,
      key: getInfoData({
        fields: ['key'],
        object: newKey
      })
    }
  }
}

export default new AccessService()
