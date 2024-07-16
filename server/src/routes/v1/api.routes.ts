import express from 'express'
import { user } from './user.routes'

const router = express.Router()

router.route('/').get((req, res) => {
  res.status(200).json({
    message: 'Hello from API v1'
  })
})

router.use('/user', user)

export const api = router
