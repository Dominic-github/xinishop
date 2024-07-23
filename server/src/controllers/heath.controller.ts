import { Request, Response } from 'express'
import { catchAsync } from '~/helpers/catchAsync.helper'
import { OK } from '../core/success.response'

class HeathController {
  healthcheck = catchAsync((req: Request, res: Response) => {
    // todo: check redis, rabbit, mongodb
    OK(res, 'OK', {})
  })
}

export default new HeathController()
