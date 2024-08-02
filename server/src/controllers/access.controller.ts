import AccessService from '~/services/access.service'
import catchAsync from '~/helpers/catchAsync.helper'
import { CREATED, OK } from '~/core/success.response'

import { Request, Response } from 'express'

class AccessController {
  login = catchAsync(async (req: Request, res: Response) => {
    OK(res, 'Login success', await AccessService.signIn(req.body))
  })

  refreshToken = catchAsync(async (req: Request, res: Response) => {
    OK(
      res,
      'Get token success',
      await AccessService.refreshToken({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore
      })
    )
  })

  logout = catchAsync(async (req: Request, res: Response) => {
    OK(res, 'Logout success', await AccessService.logout(req.keyStore))
  })

  signUp = catchAsync(async (req: Request, res: Response) => {
    CREATED(res, 'Register success', await AccessService.signUp(req.body))
  })
}

export default new AccessController()
