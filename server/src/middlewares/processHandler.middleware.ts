// if the Promise is rejected this will catch it
import { exit } from './common.middleware'
import { logger } from '~/configs/logger.config'
import { isOperationalError } from './errorHandling.middleware'
process.on('SIGINT', () => {
  console.log('Ctrl + C:: Service stop!!!')
  exit()
})

// CTRL+C
process.on('SIGQUIT', () => {
  console.log('Keyboard quit:: Service stop!!!')
  exit()
})
// Keyboard quit
process.on('SIGTERM', () => {
  console.log('Kill command:: Service stop!!!')
  exit()
})
// `kill` command

// catch all uncaught exceptions
process.on('unhandledRejection', (error) => {
  logger.error(error)
  throw error
})

process.on('uncaughtException', (error: { isOperational: any }) => {
  // if isOperational is false -> exit service
  if (!isOperationalError(error)) {
    logger.error(error)
  }
})

module.exports = this
