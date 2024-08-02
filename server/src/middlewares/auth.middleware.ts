import { Request, Response, NextFunction } from 'express'
import catchAsync from '~/helpers/catchAsync.helper'
import { Api403Error, Api404Error, Api401Error } from '~/core/error.response'
import TokenService from '~/services/token.service'
import URL_WHITELIST from '~/constants/whiteListUrl'
import { verifyJwt, extractToken, parseJwt } from '~/helpers/jwt.helper'

const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
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
    const accessToken = extractToken(req.headers[HEADER.AUTHORIZATION])

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
    if (refreshToken && keyStore.private_key) {
      try {
        const decodeUser: any = verifyJwt(refreshToken, keyStore.private_key)

        if (userId !== decodeUser.userId)
          return next(new Api401Error('Unauthorized'))

        req.user = decodeUser
        req.keyStore = keyStore
        req.refreshToken = refreshToken

        return next()
      } catch (error) {
        return next(new Api401Error('Unauthorized'))
      }
    }

    // 3. get auth token
    if (!accessToken) return next(new Api403Error('Invalid request'))

    // 4.
    try {
      if (keyStore.public_key) {
        const decodeUser: any = verifyJwt(accessToken, keyStore.public_key)
        if (userId !== decodeUser.userId)
          return next(new Api401Error('Unauthorized'))

        req.user = decodeUser
        req.keyStore = keyStore
      }

      return next()
    } catch (error) {
      return next(new Api401Error('Unauthorized'))
    }
  }
)
