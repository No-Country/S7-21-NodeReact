const validationResult = require('express-validator')

/**
 * Middleware que valida los schemas creados en express-validator
 * @param {req}
 * @returns respuesta con todos los errores. De no haber error pasa al siguiente proceso (next)
 *  
 * @example
 * router.post('/', [userSchemaValidator, validateFields], userController.createUser)
 */

const validateFields = (req, res, next) => {
    const errors = validationResult(req)
    const body = req.body
    console.log(body)

    if(!errors.isEmpty()) {
        const error = errors
            .array()
            .map((item) => item.msg)
            .join(', ')
        
        return res.status(400).json({ error });
    }

    next()
}

module.exports = validateFields