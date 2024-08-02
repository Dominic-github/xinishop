import { createLogger, transports, format } from 'winston'
import DailyRotateFile = require('winston-daily-rotate-file')
import config from '~/configs/config'
const { serviceName } = config.logger

// format log
const formatLog = format.combine(
  format.label({ label: `${serviceName}` }),
  format.json(),
  format.timestamp(), // timestamp log
  format.metadata()
  // format.prettyPrint(), // format log
)

// config file log rotate
import('winston-daily-rotate-file')
const transport = new DailyRotateFile({
  filename: `./logs/${serviceName}-%DATE%.log`,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: formatLog
})

transport.on('rotate', function (oldFilename: any, newFilename: any) {
  // do something fun
  console.log('oldFilename:  ', oldFilename)
  console.log('newFilename:  ', newFilename)
})

export const logger = createLogger({
  transports: [
    // ghi ra file trong truong hop log it
    // new transports.File({
    //     level: 'info',
    //     filename: './logs/app.info.log'
    // }),
    // new transports.File({
    //     level: 'warn',
    //     filename: './logs/app.warn.log'
    // }),
    transport
    // save log into database
    // configLogMongoDB
  ],
  format: formatLog
})

// check add log console
if (process.env.NODE_ENV !== 'productions') {
  logger.add(
    new transports.Console({
      format: formatLog
    })
  )
}
