import { Router } from 'express'
import { param } from 'express-validator'
import requestValidator from './../middlewares/requestValidator.js'
import sessionValidator from './../middlewares/sessionValidator.js'
import * as controller from './../controllers/sessionsController.js'

const router = Router()

router.get('/find/:id', sessionValidator, controller.find)

router.get('/status/:id', sessionValidator, controller.status)

router.get('/add/:id', param('id').notEmpty(), requestValidator, controller.add)

router.get('/delete/:id', sessionValidator, controller.del)

export default router
