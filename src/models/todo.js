const mongoose = require('mongoose')
const { body } = require('express-validator')

const todoSchema = new mongoose.Schema({
	title: { type: String, required: true },
})

const Todo = mongoose.model('Todo', todoSchema)

const todoValidationSchemaByBody = [
	body('title')
		.notEmpty()
		.withMessage('El título no puede estar vacío')
		.isString()
		.withMessage('Debe proporcionar un título de texto'),
	body('listId').isMongoId().withMessage('Id invalida'),
]

exports.Todo = Todo
exports.todoValidationSchemaByBody = todoValidationSchemaByBody
