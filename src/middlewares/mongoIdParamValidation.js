const { param } = require('express-validator')

module.exports = param('id').isMongoId().withMessage('Id invalida')
