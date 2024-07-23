import 'dotenv/config'
import dotenv from 'dotenv'
const NODE_ENV = process.env.NODE_ENV
dotenv.config({ path: `.env.${NODE_ENV}` })

import app from '~/app'
const PORT: number = parseInt(process.env.PORT || '3050')

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}, http://localhost:${PORT} `)
})

process.on('SIGINT', (): void => {
  server.close(() => 'Exit server express')
  // notify send (ping....)
})
