const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')
const { body } = require('express-validator')
const { pick } = require('lodash')
const createUploader = require('../utils/multer')

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	avatar: { type: String, required: true },
	avatarCloudinaryId: { type: String, required: true },
	isAdmin: Boolean,
})

userSchema.methods.generateJWT = function () {
	return jwt.sign(pick(this, ['username', 'isAdmin']), config.get('jwtSecret'))
}

const User = mongoose.model('User', userSchema)

const AVATAR_TYPES = {
	'image/jpg': 'jpg',
	'image/png': 'png',
}

const validateAvatar = (type) => AVATAR_TYPES[type]

const userValidationSchemaByBody = [
	body('username')
		.notEmpty()
		.withMessage('El nombre de usuario no puede estar vacío')
		.isString()
		.withMessage('Debe proporcionar un nombre de usuario en texto')
		.custom(async (value) => {
			const user = await User.findOne({ username: value })
			if (user) return Promise.reject()

			return Promise.resolve()
		})
		.withMessage('El nombre de usuario no está disponible'),
	body('password')
		.notEmpty()
		.withMessage('La password no puede estar vacía')
		.isString()
		.withMessage('Debe proporcionar un password en texto'),
	body('avatar')
		.custom((_, { req }) => req.file)
		.withMessage('El avatar es obligatorio')
		.custom((_, { req }) => validateAvatar(req.file.mimetype))
		.withMessage(
			'El avatar debe estar en uno de los formatos permitidos ' +
				Object.values(AVATAR_TYPES).join('/')
		),
]

const loginValidationSchemaByBody = [
	body('username')
		.notEmpty()
		.withMessage('El nombre de usuario no puede estar vacío'),
	body('password').notEmpty().withMessage('La password no puede estar vacía'),
]

exports.User = User
exports.userValidationSchemaByBody = userValidationSchemaByBody
exports.loginValidationSchemaByBody = loginValidationSchemaByBody
exports.upload = createUploader(validateAvatar)
