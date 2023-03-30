const validationResult = require('express-validator')

/**
 * Middleware que verifica los campos ingresados. Se utiliza en conjunto a los validator.
 * @param {body}
 * @returns respuesta con todos los errores. Si no hay errores, pasa al siguiente proceso (next).
 * 
 * @example
 * router.post('/', [userSchemaValidator, validateFields], userController.createUser)
 */

const validateFields = (req, res, next) => {
    const errors = validationResult(req)
    const body = req.body
    console.log(body)
    if (!errors.isEmpty()) {
        const error = errors
            .array()
            .map((item) => item.msg)
            .join(", ");
        return res.status(400).json({ error });
    }
    next()
}

module.exports = validateFields