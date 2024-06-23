import express from 'express'
import { userController } from '~/controllers/user.controllers'

const router = express.Router()

router.route('/:id').get(userController.getUser)

export const user = router
