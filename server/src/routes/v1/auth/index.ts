import express from 'express'
import AccessController from '~/controllers/access.controller'
import { authentication } from '~/middlewares/auth.middleware'
const router = express.Router()

/**
 * @swagger
 *   /api/v1/auth/register:
 *     post:
 *       summary: Register shop
 *       tags: [Auth]
 *       requestBody:
 *          description: Request login info
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RequestRegister'
 *       security: []
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "200":
 *           description: List product contains key search
 *           contents:
 *             application/json
 */
router.post('/register', AccessController.signUp)

/**
 * @swagger
 *   /api/v1/auth/login:
 *     post:
 *       summary: Shop login
 *       tags: [Auth]
 *       security: [{apiKey: []}]
 *       requestBody:
 *          description: Request login info
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RequestLogin'
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "200":
 *           description: Login response info
 *           contents:
 *             application/json
 */
router.post('/login', AccessController.login)

// Authentication

router.use(authentication)

/**
 * @swagger
 *   /api/v1/auth/logout:
 *     post:
 *       summary: Shop logout
 *       tags: [Auth]
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "200":
 *           description: Logout successful
 *           contents:
 *             application/json
 */
router.post('/logout', AccessController.logout)

/**
 * @swagger
 *   /api/v1/auth/refresh-token:
 *     post:
 *       summary: Register shop
 *       tags: [Auth]
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "200":
 *           description: Response refresh token info
 *           contents:
 *             application/json
 */
router.post('/refresh-token', AccessController.refreshToken)

export default router
