import { Request, Response, NextFunction } from 'express'
const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization'
}

import { findById } from '~/services/apiKey.service'
const URL_WHITELIST = ['/api-docs', '/healthcheck', '/api/v1/auth/register']

export const apiKey = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (ignoreWhiteList(req)) return next()

    const key = req.headers[HEADER.API_KEY]?.toString()
    if (!key) {
      return returnForbiddenError(res)
    }
    // check objKey
    const objKey = await findById(key)
    if (!objKey) {
      return returnForbiddenError(res)
    }

    req.objKey = objKey

    return next()
  } catch (error) {
    return returnForbiddenError(res)
  }
}

export const permission = (permissions: string) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (ignoreWhiteList(req)) return next()

    if (!req.objKey.permissions) {
      return returnPermissionDenied(res)
    }

    console.log('permissions::', req.objKey.permissions)
    const validPermission = req.objKey.permissions.includes(permissions)

    if (!validPermission) {
      return returnPermissionDenied(res)
    }

    return next()
  }
}

const throwApi403Error = (message: string) => {
  return {
    message: message
  }
}

const returnApi403Error = (res: Response, message: string) => {
  return res.status(403).json(throwApi403Error(message))
}

const returnForbiddenError = (res: Response) => {
  return returnApi403Error(res, 'Forbidden Error')
}

const returnPermissionDenied = (res: Response) => {
  return returnApi403Error(res, 'Permission denied')
}

export const ignoreWhiteList = (req: Request) => {
  return URL_WHITELIST.includes(req.url)
}
