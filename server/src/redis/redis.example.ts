import { createClient } from 'redis'

async function nodeRedisDemo() {
  try {
    const client = createClient()
    await client.connect()

    await client.set('mykey', 'Hello from node redis')
    const myKeyValue = await client.get('mykey')
    console.log(myKeyValue)

    const numAdded = await client.zAdd('vehicles', [
      {
        score: 4,
        value: 'car'
      },
      {
        score: 2,
        value: 'bike'
      }
    ])
    console.log(`Added ${numAdded} items.`)

    for await (const { score, value } of client.zScanIterator('vehicles')) {
      console.log(`${value} -> ${score}`)
    }

    await client.quit()
  } catch (e) {
    console.error(e)
  }
}

nodeRedisDemo()
