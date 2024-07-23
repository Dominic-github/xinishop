import express from 'express'
import API_V1 from './v1'
import API_V2 from './v2'
import healthRouter from './health'
// const { apiKey, permission } = require('../auth/checkAuth')
const router = express.Router()

// health check application
router.use('/healthcheck', healthRouter)

// check apiKey
// router.use(apiKey)

// check permission
// router.use(permission('0000'))

// init routes
router.use('/api/v1/', API_V1)
router.use('/api/v2/', API_V2)

export default router
