// lay ip user
import { instanceRedis as client } from '~/configs/redis.config'

export const get = async (key: string) => {
  return new Promise((resolve, reject) => {
    client.get(key, (error: any, data: unknown) => {
      if (error) {
        return reject(error)
      }

      return resolve(data)
    })
  })
}

// co the set nhieu lan
export const set = async (key: any, value: any) => {
  return new Promise((resolve, reject) => {
    client.set(key, value, (error: any, data: unknown) => {
      if (error) {
        return reject(error)
      }

      resolve(data)
    })
  })
}

// set 1 lan duy nhat
export const setnx = async (key: any, value: any) => {
  return new Promise((resolve, reject) => {
    client.setnx(key, value, (error: any, data: unknown) => {
      if (error) {
        return reject(error)
      }

      resolve(data)
    })
  })
}

// cache tu dong tang with redis
export const incr = (key: any) => {
  return new Promise((resolve, reject) => {
    // method tu dong tang trong redis
    client.incr(key, (error: any, result: unknown) => {
      if (error) return reject(error)
      resolve(result)
    })
  })
}

export const decrby = async (key: any, count: any) => {
  return new Promise((resolve, reject) => {
    // method tu dong tang trong redis
    client.decrby(key, count, (error: any, result: unknown) => {
      if (error) return reject(error)
      resolve(result)
    })
  })
}

// expire key redis
export const expire = (key: any, ttl: any) => {
  return new Promise((resolve, reject) => {
    // method tu dong tang trong redis
    client.expire(key, ttl, (error: any, result: unknown) => {
      if (error) return reject(error)
      resolve(result)
    })
  })
}

// get ttl thoi gian het han con lai
export const ttl = (key: any) => {
  return new Promise((resolve, reject) => {
    // method tu dong tang trong redis
    client.ttl(key, (error: any, ttl: unknown) => {
      if (error) return reject(error)
      resolve(ttl)
    })
  })
}

export const exists = async (key: any) => {
  return new Promise((resolve, reject) => {
    // method tu dong tang trong redis
    client.exists(key, (error: any, data: unknown) => {
      if (error) return reject(error)
      resolve(data)
    })
  })
}
