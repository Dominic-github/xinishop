import prisma from '~/models/client'

class UserService {
  getAddress = async () => {
    const data = await prisma.administrativeUnits.findMany()
    console.log(data)
    return data
  }
}

export default new UserService()
