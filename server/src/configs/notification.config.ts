import { config } from '~/configs/config'
import { Client, GatewayIntentBits } from 'discord.js'

const discord = config.notification.discord

class DiscordLogConfig {
  client: any
  channelId: any
  static instance: any
  constructor() {
    this.connect()
  }

  async connect() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ]
    })

    // add channel id
    this.channelId = discord.channelId

    this.client.on('ready', () => {
      console.log(`Logged is as ${this.client.user.tag}`)
    })

    await this.client.login(discord.token)
  }

  static getInstance() {
    if (!DiscordLogConfig.instance) {
      DiscordLogConfig.instance = new DiscordLogConfig()
    }

    return DiscordLogConfig.instance
  }

  sendMessage(msg: {
    content: ''
    embeds: { color: number; title: ''; description: string }[]
  }) {
    const channel: any = this.client.channels.cache.get(this.channelId)
    if (!channel) {
      console.error(`Couldn't find the channel: ${this.channelId}`)
      return
    }

    channel.send(msg).catch((e: any) => console.error(e))
  }

  sendToFormatCode(logData: {
    code: any
    message?: '' | undefined
    title?: '' | undefined
  }) {
    const { code, message = '', title = '' } = logData

    const codeMsg = {
      content: message,
      embeds: [
        {
          color: parseInt('00ff00', 16),
          title,
          description: '```json\n' + JSON.stringify(code, null, 2) + '\n```'
        }
      ]
    }

    this.sendMessage(codeMsg)
  }
}

export const instanceDiscord = DiscordLogConfig.getInstance()
