import prisma from '~/models/client'
import { createClient } from 'redis'
import config from '~/configs/config'
const { host, port } = config.redis

class heathService {
  checkHealth = async () => {
    // check conection prisma
    const data = {
      database: 'Connected',
      redis: 'Connected',
      rabbit: 'Connected'
    }
    const prismaConnected = await this.prismaConnect()
    if (!prismaConnected) data.database = 'Disconnected'
    const redisConnected = await this.redisConnect()
    if (!redisConnected) data.redis = 'Disconnected'

    return data
  }

  async prismaConnect() {
    try {
      await prisma.$connect()
      await prisma.$executeRaw`SELECT 1` // Simple query to ensure connection
      return true
    } catch (error) {
      return false
    } finally {
      await prisma.$disconnect()
    }
  }

  async redisConnect() {
    try {
      const client: any = createClient({
        socket: {
          host: host,
          port: Number(port)
        }
      })
      await client.connect()
      if (client.isReady) return true
      await client.disconnect()

      return false
    } catch (error) {
      return false
    }
  }
}

export default new heathService()
