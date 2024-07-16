'use strict'

import mongoose from 'mongoose'
import os from 'os'
import process from 'process'
const _SECONDS = 5000

const countConnect = () => {
  const numConnections = mongoose.connections.length
  console.log(`Number of connections: ${numConnections}`)
}

const checkOverLoad = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length
    const numCores = os.cpus().length
    const memoryUsage = process.memoryUsage().rss

    const maxConnection = numCores * 5
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`)

    if (numConnections > maxConnection) {
      console.log('Connection oveload detected')
    }
  }, _SECONDS) // Monitor every 5 seconds
}

module.exports = {
  countConnect,
  checkOverLoad
}
