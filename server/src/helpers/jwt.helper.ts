import JWT from 'jsonwebtoken'
import { VerifyErrors } from 'jsonwebtoken'

const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
  REFRESH_TOKEN: 'x-refresh-token',
  BEARER: 'Bearer '
}

export const createTokenPair = async (
  payload: object,
  publicKey: string,
  privateKey: string
) => {
  try {

    // auth token
    const accessToken: string = await JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '1 days'
    })

    // refresh token
    const refreshToken: string = await JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '2 days'
    })

    // verify key
    verifyJwt(accessToken, publicKey)

    return {
      accessToken,
      refreshToken
    }
  } catch (error) {
    console.error(`createTokenPair error:: `, error)
  }
}

/**
 * This module used for verify jwt token
 * @param {*} token
 * @param {*} keySecret
 */
export const verifyJwt = (token: string, keySecret: string) => {
  return JWT.verify(token, keySecret, (error: VerifyErrors | null, decode) => {
    if (error) {
      console.error(`error verify:: `, error)
      return
    } else {
      return decode
    }
  })
}

export const extractToken = (tokenHeader: any) => {
  if (!tokenHeader) return ''
  return tokenHeader.replace(HEADER.BEARER, '')
}

export const parseJwt = (token: string) => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}
