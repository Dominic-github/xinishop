import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import { config } from '~/configs/config'
import configViewEngine from '~/configs/viewEngine.config'
import { checkEnable } from '~/utils'
import middlewareI18Next from 'i18next-http-middleware'
import i18next from '~/middlewares/i18next.middleware'
import routes from '~/routes'

const app = express()

// init middleware
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// setting body parser, cookie parser
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())

// init db
if (checkEnable(config.db.enable)) {
  import('~/configs/database.config')
}

// Config view engine
configViewEngine(app)

// init redis
if (checkEnable(config.redis.enable)) {
  import('./configs/redis.config')
}

// init swagger
if (checkEnable(config.openApi.enable)) {
  import('~/configs/swagger.config').then(({ openApi }) => openApi(app))
}

// init logger
import expressWinston from 'express-winston'
import { logger } from '~/configs/logger.config'

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
  })
)

// config i18n

app.use(
  middlewareI18Next.handle(i18next, {
    ignoreRoutes: ['/foo'], // or function(req, res, options, i18next) { /* return true to ignore */ }
    removeLngFromUrl: false // removes the language from the url when language detected in path
  })
)
// init route
app.use('', routes)

// handling errors
import {
  logErrorMiddleware,
  returnError,
  is404Handler,
  isOperationalError
} from '~/middlewares/errorHandling.middleware'
app.use(is404Handler)
app.use(isOperationalError)
app.use(logErrorMiddleware)
app.use(returnError)

// process handler
import('~/middlewares/processHandler.middleware')

export default app
