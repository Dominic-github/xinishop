import crypto from 'crypto'
import prisma from '~/prisma/client'

export const createKey = async (permissions: Array<string> = ['0000']) => {
  const newKey = await prisma.apiKey.create({
    data: {
      key: crypto.randomBytes(64).toString('hex'),
      permissions: permissions
    }
  })
  return newKey
}

export const findbyKey = async (key: string) => {
  const objKey = await prisma.apiKey.findUnique({
    where: {
      key: key,
      status: true
    }
  })
  return objKey
}
