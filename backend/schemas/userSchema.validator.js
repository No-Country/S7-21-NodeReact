const check = require('express-validator')

/**
 * Middleware que valida los datos para crear el schema de User creados en express-validator
 * @example
 * router.post('/', [userSchemaValidator, validateFields], userController.createUser)
 */

const userSchemaValidator = [
    check('firstName', 'El nombre es obligatorio').exists().not().isEmpty().trim(),
    check('lastName', 'El apellido es obligatorio').exists().not().isEmpty().trim(),
    check('email', 'El mail es obligatorio').exists().isemail().trim(),
    check('phone', 'Número no válido').exists().isNumeric().isLength({min: 6}),
    check('password', 'El password debe ser de más de 6 caracteres').exists().isLength({min: 6}).trim()
]

module.exports = userSchemaValidator