import {
  Api404Error,
  BaseError,
  BusinessLogicError,
  Api401Error,
  Api403Error
} from '~/core/error.response'
import { Request, Response, NextFunction } from 'express'
import instanceDiscord from '~/configs/notification.config'
import config from '../configs/config'

interface IError {
  errmsg: any
  status: number
  name: string
  isOperational: boolean
  message: string
  errors: object
  code: number
}

export const logError = (error: any) => {
  console.log(error)
}

export const logErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: any
  if (config.app.env === 'production') {
    error = handleError(err)
  } else {
    error = err
  }
  logError(error)
  instanceDiscord.sendToFormatCode({
    code: req.method === 'GET' ? req.query : req.body,
    message: `${req.get('host')}${req.originalUrl}`,
    title: `Method: ${req.method}`
  })
  returnError(err, req, res)
  next()
}

export const returnError = (err: any, req: Request, res: Response) => {
  const statusCode = err.status || 500
  let error: any
  if (err instanceof BaseError) {
    error = handleError(err)
  } else {
    error = { ...err }
    // mapping error
    if (err.name === 'CastError') error = handleCastErrorDB(err)
    if (err.code === 11000) error = handleDuplicateFieldsDB(err)
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err)
    if (err.name === 'JsonWebTokenError') error = handlerJWTError(err)
    if (err.name === 'TokenExpiredError') error = handlerJWTExpiredError(err)
  }

  return res.status(statusCode).json({
    status: statusCode,
    message: error.message || 'Internal server error',
    errors: error.errors
  })
}

export const isOperationalError = (error: { isOperational: boolean }) => {
  if (error instanceof BaseError) {
    return error.isOperational
  }
  return false
}

export const is404Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Api404Error('Resource not found')
  next(error)
}

const handleError = (err: any) => {
  const error: any = {}
  if (err instanceof BaseError) {
    error.name = err.name
    error.statusCode = err.status
    error.isOperational = err.isOperational
    error.message = err.message
    error.errors = err.errors
  }
  return error
}

const handleCastErrorDB = (error: any) => {
  const message = `Invalid ${error.path}: ${error.value}.`
  return new BusinessLogicError(message)
}

const handleDuplicateFieldsDB = (error: IError) => {
  const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0]
  console.log(value)
  const message = `Duplicate field value: ${value}. Please use another value!`
  return new BusinessLogicError(message)
}

const handleValidationErrorDB = (error: IError) => {
  const errors = Object.values(error.errors).map((el) => el.message)
  console.log(errors)
  const message = `Invalid input data. ${errors.join('. ')}`
  return new BusinessLogicError(message)
}

const handlerJWTError = (error: IError) => {
  console.error(error)
  const message = `Invalid token. Please login again!`
  return new Api401Error(message)
}

const handlerJWTExpiredError = (error: IError) => {
  console.error(error)
  const message = `Your token has expired! Please log in again.`
  return new Api403Error(message)
}
