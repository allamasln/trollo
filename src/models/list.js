const mongoose = require('mongoose')
const { body } = require('express-validator')

const { ObjectId } = mongoose.Schema.Types

const listSchema = new mongoose.Schema({
	title: { type: String, required: true },
	todos: [{ type: ObjectId, ref: 'Todo' }],
})

const List = mongoose.model('List', listSchema)

const listValidationSchemaByBody = [
	body('title')
		.notEmpty()
		.withMessage('El título no puede estar vacío')
		.isString()
		.withMessage('Debe proporcionar un título de texto'),
]

exports.List = List
exports.listValidationSchemaByBody = listValidationSchemaByBody
