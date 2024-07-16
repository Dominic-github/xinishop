import { createServer } from 'http'
import 'dotenv/config'
import app from '~/app'
const PORT: number = parseInt(process.env.PORT || '3050')
const httpServer = createServer(app)

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}, http://localhost:${PORT} `)
  console.log('Press CTRL + C to stop the server')
})

process.on('SIGINT', () => {
  httpServer.close(() => {
    console.log('Exit server express')
  })
})
