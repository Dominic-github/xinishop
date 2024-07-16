import { StatusCodes } from 'http-status-codes'
import { env } from '~/configs/environment.config'

export const errorHandlingMiddleware = (err: any, req: any, res: any) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack
  }
  if (env.BUILD_MODE !== 'dev') delete responseError.stack

  res.status(responseError.statusCode).json(responseError)
}
