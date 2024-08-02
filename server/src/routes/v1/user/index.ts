import express from 'express'
import UserController from '~/controllers/user.controller'
import { authentication } from '~/middlewares/auth.middleware'
const router = express.Router()

router.get('/address', UserController.getAddress)

// Authentication
router.use(authentication)

export default router
