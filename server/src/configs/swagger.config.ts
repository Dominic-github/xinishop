import swaggerUi from 'swagger-ui-express'
import { Request, Response, NextFunction, Express } from 'express'

// import fs from 'fs'
// import YAML from 'yaml'
// const file = fs.readFileSync('./docs/swagger.yaml', 'utf8')
// import swaggerDocumentJson from '../../docs/swagger.json'
// const swaggerDocumentYaml = YAML.parse(file)

import { options as optionsOpenApi } from '~/configs/openapi.config'
import swaggerJsdoc from 'swagger-jsdoc'
const specs = swaggerJsdoc(optionsOpenApi)

export const openApi = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
  routeDefault(app)
}

// const optionsSwagger = {
//   swaggerOptions: {
//     urls: [
//       {
//         url: '/api-docs/swagger.json',
//         name: 'Json'
//       },
//       {
//         url: '/api-docs/swagger.yaml',
//         name: 'Yaml'
//       }
//     ]
//   }
// }

// const configSwagger = (app: Express) => {
//   app.get('/api-docs/swagger.json', (req: Request, res: Response) =>
//     res.json(swaggerDocumentJson)
//   )
//   app.get('/api-docs/swagger.yaml', (req: Request, res: Response) =>
//     res.json(swaggerDocumentYaml)
//   )
//   app.use(
//     '/api-docs',
//     swaggerUi.serveFiles(undefined, optionsSwagger),
//     swaggerUi.setup(undefined, optionsSwagger)
//   )
//   routeDefault(app)
// }

const routeDefault = (app: Express) => {
  // setting router default
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.url === '/') {
      res.redirect('/api-docs')
      return
    }
    next()
  })
}
