const mongoose = require('mongoose')
const config = require('config')
const winston = require('winston')

module.exports = function () {
	mongoose.connect(config.get('db')).then(() => winston.info('MongoDB on...'))
}
