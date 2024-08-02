import express from 'express'
import API_V1 from './v1'
import API_V2 from './v2'
import health from './health'
import { apiKey, permission } from '~/auths/checkauth.auth'
import ApiKeyController from '~/controllers/apiKey.controller'
const router = express.Router()

// health check application
router.use('/healthcheck', health)

// init api Key
router.post('/apiKey/create', ApiKeyController.createApiKey)
router.get('/index', (req, res) => {
  res.render('index')
})
// check apiKey
router.use(apiKey)

// check permission
router.use(permission('0000'))

// init routes
router.use('/v1/api', API_V1)
router.use('/v2/api', API_V2)

export default router
