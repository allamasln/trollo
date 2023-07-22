const multer = require('multer')

module.exports = function (err, req, res, next) {
	console.log(err instanceof multer.MulterError)
	if (err.message === 'Archivo en formato invalido')
		return res.status(400).send(err.message)

	next(err)
}
