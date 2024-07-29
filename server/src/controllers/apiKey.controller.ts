import { catchAsync } from '~/helpers/catchAsync.helper'
import { Request, Response } from 'express'
import { CREATED } from '../core/success.response'
import ApiKeyService from '~/services/apiKey.service'

class ApiKeyController {
  createApiKey = catchAsync(async (req: Request, res: Response) => {
    CREATED(
      res,
      'ApiKey created successfully.',
      await ApiKeyService.createApiKey(req.body.permissions)
    )
  })
}

export default new ApiKeyController()
