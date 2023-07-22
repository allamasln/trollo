const express = require('express')

const router = express.Router()

const TodoControllers = require('../controllers/todos')
const isAuth = require('../middlewares/isAuth')

const { todoValidationSchemaByBody } = require('../models/todo')
const validate = require('../middlewares/validate')

router.post(
	'/',
	isAuth,
	todoValidationSchemaByBody,
	validate,
	TodoControllers.create
)

module.exports = router
