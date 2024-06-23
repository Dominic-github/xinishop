import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { Server, Socket } from 'socket.io'
import { createServer } from 'http'
import configViewEngine from '~/configs/viewEngine.config'
import { APIs_V1 } from '~/routes/v1'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

const PORT: number = parseInt(process.env.PORT || '3001')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Config view engine
configViewEngine(app)

app.use('/v1', APIs_V1)

app.get('/', (_, res) => {
  return res.render('index')
})

io.on('connection', (socket: Socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
  })
})
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}, http://localhost:${PORT} `)
  console.log('Press CTRL + C to stop the server')
})
