import express from 'express'
const router = express.Router()
import healthController from '~/controllers/heath.controller'

/**
 * @swagger
 *   /healthcheck:
 *     get:
 *       summary: API check health of service
 *       tags: [Health]
 *       security: []
 *       responses:
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 *         "200":
 *           description: OK
 *           contents:
 *             application/json
 */
router.get('', healthController.healthcheck)

export default router
