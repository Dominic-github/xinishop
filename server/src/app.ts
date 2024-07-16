import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import 'dotenv/config'
import configViewEngine from '~/configs/viewEngine.config'
import { APIs_V1 } from '~/routes/v1'

const app = express()

// init middleware
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Config view engine
configViewEngine(app)

// init route
app.use('/v1', APIs_V1)

app.get('/', (_, res) => {
  return res.render('index')
})

export default app
