import express from 'express';

function welcomeMessage(req, res) {
	console.log('getting the home message');
	res.json({ message: 'Welcome to the coolest API on earth!!'});
}

export default function createController(options) {
	var router = express.Router();

	router.route('/')
		  .get(welcomeMessage);

    return router;
}