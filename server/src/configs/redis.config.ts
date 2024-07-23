import redis from 'redis'

import { config } from '~/configs/config'

const { host, port, username, password } = config.redis

class RedisConf {
  static instance: any
  constructor() {
    this.connect()
  }

  connect() {
    const client: any = redis.createClient({
      username: username,
      password: password,
      socket: {
        host: host,
        port: Number(port)
      }
    })

    client.on('connect', () => {
      console.log(`Connected: Redis connected host ${host} port ${port}!`)
    })

    client.on('error', () => {
      console.log(`Error: Redis connected host ${host} port ${port}!`)
    })
  }

  static getInstance() {
    if (!RedisConf.instance) {
      RedisConf.instance = new RedisConf()
    }

    return RedisConf.instance
  }
}

export const instanceRedis = RedisConf.getInstance()
