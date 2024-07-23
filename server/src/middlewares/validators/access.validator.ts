import { Api403Error } from '~/core/error.response'

import { Response, Request, NextFunction } from 'express'
export const validateLoginRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginRequest = req.body
  // check email
  if (!loginRequest.email || loginRequest.email.length < 8) {
    throw new Api403Error('Email invalid')
  }
  // check password
  if (!loginRequest.password || loginRequest.email.password < 8) {
    throw new Api403Error('Password invalid')
  }

  return next()
}

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const registerRequest = req.body
  // check name
  if (!registerRequest.name || registerRequest.name.length < 8) {
    throw new Api403Error('Name invalid')
  }
  // check email
  if (!registerRequest.email || registerRequest.email.length < 8) {
    throw new Api403Error('Email invalid')
  }
  // check password
  if (!registerRequest.password || registerRequest.password.length < 8) {
    throw new Api403Error('Password invalid')
  }
  // check msisdn
  if (!registerRequest.msisdn || registerRequest.msisdn.length < 10) {
    throw new Api403Error('Msisdn invalid')
  }

  return next()
}
