import { Request, Response } from 'express'
import heathService from '~/services/health.service'
import catchAsync from '~/helpers/catchAsync.helper'
import { OK } from '../core/success.response'

class HeathController {
  healthcheck = catchAsync(async (req: Request, res: Response) => {
    // todo: check redis, rabbit, prisma
    OK(res, 'OK', await heathService.checkHealth())
  })
}

export default new HeathController()
