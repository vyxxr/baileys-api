import { isSessionExists } from '../whatsapp.js'
import response from './../response.js'

const validate = (req, res, next) => {
    const sessionId = req.headers['id'] ?? req.params.id ?? req.query.id

    if (!isSessionExists(sessionId)) {
        return response(res, 404, false, 'Session not found.')
    }

    res.locals.sessionId = sessionId
    next()
}

export default validate
