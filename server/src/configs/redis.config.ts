import { createClient } from 'redis'
import config from '~/configs/config'
const { host, port } = config.redis

class RedisConf {
  static instance: any
  client: any
  constructor() {
    this.connect()
  }

  async connect() {
    const client: any = createClient({
      socket: {
        host: host,
        port: Number(port)
      }
    })
    this.client = client

    client.connect()
    client.on('connect', () => {
      console.log(`Connected: Redis connecting ${host}:${port}!`)
    })
    client.on('error', () => {
      console.log(`Error: Redis is not connected ${host}:${port}!`)
      client.disconnect()
    })
  }

  getClient() {
    return this.client
  }

  static getInstance() {
    if (!RedisConf.instance) {
      RedisConf.instance = new RedisConf()
    }

    return RedisConf.instance
  }
}

export default RedisConf.getInstance()
