import type { IUser } from '~/interfaces/iUser.interface'
import type { IKeyStore } from '~/interfaces/iKeyStore.interface'

declare global {
  namespace Express {
    interface Request {
      user: IUser
      keyStore: IKeyStore
      refreshToken: string
      objKey: object
    }
  }
}

export {}
