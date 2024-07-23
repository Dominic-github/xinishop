import { catchAsync } from '~/helpers/catchAsync.helper'
import { Request, Response } from 'express'
import { OK } from '../core/success.response'
import {
  get,
  set,
  setnx,
  incr,
  decrby,
  expire,
  exists,
  ttl
} from '~/utils/redis.util'

class RedisController {
  redisTest = catchAsync(async (req: Request, res: Response) => {
    const sleep = (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }
    const test = async () => {
      const key = 'redis-test'
      await set(key, 'Ta Duy Hoang')
      console.log(await get(key))

      const key2 = 'count'
      await setnx(key2, 1)

      const key3 = 'product_incre'
      incr(key3)
      incr(key3)
      incr(key3)
      incr(key3)
      incr(key3)
      console.log(await get(key3))
      decrby(key3, 1)
      console.log(await get(key3))
      console.log('ttl:::', await ttl(key3))
      expire(key3, 100)
      await sleep(1000)
      console.log(await get(key3))

      console.log(await exists('dsada'))
    }

    await test()

    OK(res, 'OK', {})
  })
}

module.exports = new RedisController()
