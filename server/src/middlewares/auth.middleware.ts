import { Request, Response, NextFunction } from 'express'
import { catchAsync } from '~/helpers/catchAsync.helper'
import { Api403Error, Api404Error, Api401Error } from '~/core/error.response'
import TokenService from '../services/auth.services'
import URL_WHITELIST from '~/constants/whiteListUrl'
import { verifyJwt, extractToken, parseJwt } from '~/helpers/jwt.helper'

const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  ACCESS_TOKEN: 'x-access-token',
  REFRESH_TOKEN: 'x-refresh-token',
  BEARER: 'Bearer '
}

const ignoreWhiteList = (request: Request) => {
  return URL_WHITELIST.includes(request.url)
}

export const authentication = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (ignoreWhiteList(req)) return next()

    const clientId = req.headers[HEADER.CLIENT_ID]
    const refreshToken = extractToken(req.headers[HEADER.REFRESH_TOKEN])
    const accessToken = extractToken(req.headers[HEADER.ACCESS_TOKEN])

    // 1. check user id
    const obj = parseJwt(accessToken || refreshToken)
    if (!obj.userId) return next(new Api403Error('Invalid request'))

    // 2. check user id
    const userId = clientId || obj.userId
    if (!userId) return next(new Api403Error('Invalid request'))

    // 2. check keyStore by userId
    const keyStore = await TokenService.findByUserId(userId)
    if (!keyStore) return next(new Api404Error('Resource not found'))

    // 3. get refreshToken
    if (refreshToken) {
      try {
        const decodeUser = verifyJwt(refreshToken, keyStore.privateKey)
        if (userId !== decodeUser.userId)
          return next(new Api401Error('Invalid userId'))

        req.user = decodeUser
        req.keyStore = keyStore
        req.refreshToken = refreshToken

        return next()
      } catch (error) {
        throw error
      }
    }

    // 3. get auth token
    if (!accessToken) return next(new Api403Error('Invalid request'))

    // 4.
    try {
      const decodeUser = verifyJwt(accessToken, keyStore.publicKey)
      if (userId !== decodeUser.userId)
        return next(new Api401Error('Invalid userId'))

      req.user = decodeUser
      req.keyStore = keyStore
      return next()
    } catch (error) {
      throw error
    }
  }
)
