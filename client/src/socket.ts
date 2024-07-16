import { io } from 'socket.io-client'
import 'dotenv/config'

// "undefined" means the URL will be computed from the `window.location` object
const URL: string =
  process.env.NODE_ENV === 'production'
    ? 'a'
    : (process.env.SERVER_URL as string)

export const socket = io(URL)
