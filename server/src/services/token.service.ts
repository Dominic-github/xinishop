import prisma from '~/models/client'

class TokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken
  }: {
    userId: string
    publicKey: string
    privateKey: string
    refreshToken: string
  }) => {
    try {
      const filter = { user_id: userId },
        data = {
          public_key: publicKey,
          private_key: privateKey,
          refresh_token: refreshToken,
          refresh_token_used: ['']
        },
        create = {
          ...data,
          user_id: userId
        }

      const tokens = await prisma.token.upsert({
        where: filter,
        update: data,
        create: create
      })

      return tokens ? tokens.public_key : null
    } catch (error) {
      console.error('createKeyToken::error::', error)
      throw error
    }
  }

  static findByUserId = async (userId: string) => {
    return await prisma.token.findUnique({ where: { user_id: userId } })
  }

  static findByRefreshTokenUsed = async (refreshToken: string) => {
    return await prisma.token.findFirst({
      where: { refresh_token_used: { has: refreshToken } }
    })
  }

  static findByRefreshToken = async (refreshToken: string) => {
    return await prisma.token.findFirst({
      where: { refresh_token: refreshToken }
    })
  }

  static deleteKeyById = async (userId: string) => {
    return await prisma.token.delete({ where: { user_id: userId } })
  }
}

export default TokenService
