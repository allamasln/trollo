const express = require('express')

const UserControllers = require('../controllers/users')

const { userValidationSchemaByBody, upload } = require('../models/user')
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
	userValidationSchemaByBody,
	validate,
	UserControllers.login
)

module.exports = router
