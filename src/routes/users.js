const express = require('express')

const UserControllers = require('../controllers/users')

const {
	userValidationSchemaByBody,
	loginValidationSchemaByBody,
	upload,
} = require('../models/user')
const validate = require('../middlewares/validate')

const router = express.Router()

router.post(
	'/signup',
	upload.single('avatar'),
	userValidationSchemaByBody,
	validate,
	UserControllers.register
)
router.post(
	'/signin',
	loginValidationSchemaByBody,
	validate,
	UserControllers.login
)

module.exports = router
