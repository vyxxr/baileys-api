import { Router } from 'express'
import { body } from 'express-validator'
import requestValidator from './../middlewares/requestValidator.js'
import sessionValidator from './../middlewares/sessionValidator.js'
import * as controller from './../controllers/connectionController.js'

const router = Router()

router.post('/connect', sessionValidator, controller.connect)

// router.get('/status/:id', sessionValidator, controller.status)

// router.post('/add', body('id').notEmpty(), body('isLegacy').notEmpty(), requestValidator, controller.add)

// router.delete('/delete/:id', sessionValidator, controller.del)

export default router
