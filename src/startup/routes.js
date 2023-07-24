require('express-async-errors')
const { json } = require('express')
const morgan = require('morgan')

const helmet = require('helmet')
const compression = require('compression')

const errors = require('../middlewares/errors')

module.exports = function (app) {
	app.use(helmet())
	app.use(compression())
	app.use(json())
	app.use(morgan('tiny'))

	app.use('/api/todos', require('../routes/todos'))
	app.use('/api/lists', require('../routes/lists'))
	app.use('/api/users', require('../routes/users'))

	app.get('/ping', (req, res) => {
		res.json('pong')
	})

	app.use(errors)
}
