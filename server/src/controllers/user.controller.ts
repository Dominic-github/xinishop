import { OK } from '~/core/success.response'
import UserService from '~/services/user.services'
import { Request, Response } from 'express'

class UserController {
  getAddress = async (req: Request, res: Response) => {
     OK(res, 'Get token success', await UserService.getAddress())
  }
}

export default new UserController()
