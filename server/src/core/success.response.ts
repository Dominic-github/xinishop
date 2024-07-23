import { StatusCodes } from '~/constants/http'
import { Response } from 'express'

class SuccessResponse {
  message: string
  status: number
  data: object
  options: object
  isOperational: any

  constructor(
    message: string,
    status = StatusCodes.OK,
    data = {},
    options = {}
  ) {
    this.message = message
    this.status = status
    this.data = data
    this.options = options
  }

  send(res: Response) {
    return res.status(this.status).json(this)
  }
}

class Ok extends SuccessResponse {
  constructor(message: string, data: object, options: object = {}) {
    const status: number = StatusCodes.OK
    super(message, status, data, options)
  }
}

class Create extends SuccessResponse {
  constructor(message: string, data = {}, options = {}) {
    const status: number = StatusCodes.CREATED
    super(message, status, data, options)
  }
}

export const CREATED = (
  res: Response<any, Record<string, any>>,
  message: any,
  data: object,
  options = {}
) => {
  new Create(message, data, options).send(res)
}

export const OK = (
  res: Response<any, Record<string, any>>,
  message: string,
  data: object,
  options = {}
) => {
  new Ok(message, data, options).send(res)
}
