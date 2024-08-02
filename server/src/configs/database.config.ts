import prisma from '~/models/client'
class Database {
  static instance: any
  constructor() {
    this.connect()
  }
  async connect() {
    try {
      await prisma.$connect()
      await prisma.$executeRaw`SELECT 1` // Simple query to ensure connection
      console.log('Connected: Prisma is connected to the database.')
    } catch (error) {
      console.error('Error: Prisma is not connected to the database:', error)
    } finally {
      await prisma.$disconnect()
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}

export default Database.getInstance()
