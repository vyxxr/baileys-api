import { addHooks } from './../whatsapp.js'
import response from './../response.js'

const connect = (req, res) => {
    const hooks = req.body
    const id = req.headers['id']

    addHooks(id, hooks)
    response(res, 200, true, 'Connected successfully!')
}

export { connect }
