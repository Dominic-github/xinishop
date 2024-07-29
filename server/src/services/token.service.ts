import prisma from '~/prisma/client'

class TokenService {
  static createKeyToken = async (
    userId: string,
    publicKey: string,
    privateKey: string,
    refreshToken: string
  ) => {
    try {
      const filter = { user_id: userId },
        update = {
          public_key: publicKey,
          privateKey: privateKey,
          refresh_token: refreshToken,
          refresh_token_used: []
        },
        create = {
          user_id: userId,
          ...update
        }

      const tokens = await prisma.token.upsert({
        where: filter,
        update: update,
        create: create
      })

      return tokens ? tokens.public_key : null
    } catch (error) {
      console.error('createKeyToken::error::', error)
      throw error
    }
  }

  static findByUserId = async (userId: string) => {
    return await prisma.token.findOne({ user_id: userId })
  }

  // logout
  static removeKeyById = async (id) => {
    return await prisma.token.remove(id)
  }

  static findByRefreshTokenUsed = async (refreshToken: string) => {
    return await prisma.token
      .findOne({ refreshTokensUsed: refreshToken })
      .lean()
  }

  static findByRefreshToken = async (refreshToken: string) => {
    return await prisma.token.findOne({ refreshToken })
  }

  // refresh token
  static deleteKeyById = async (userId: string) => {
    return await prisma.token.delete({ where: { user_id: userId } })
  }
}

export default TokenService
