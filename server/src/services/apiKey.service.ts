import { createKey } from '~/models/repository/apiKey.repo'

class ApiKeyService {
  static async createApiKey(permissions: Array<string>) {
    return await createKey(permissions)
  }
}

export default ApiKeyService
