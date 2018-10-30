const
	express = require('express'),
	{ $hello } = require.main.require('./services'), // Destructure services object with $servicename
	app = express.Router();

app.get('/', (req, res, next) => {
	const message = $hello.greet('Hello world');
	res.status(200).send(message);
});

module.exports = app;