import { createKey } from '~/prisma/repository/apiKey.repo'

class ApiKeyService {
  static async createApiKey(permissions: Array<string>) {
    return await createKey(permissions)
  }
}

export default ApiKeyService
