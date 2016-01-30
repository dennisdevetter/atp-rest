import express from 'express';
import welcome from './welcome';

export default function createController(options) {
	var router = express.Router();

	router.route('/')
		  .get(welcome);

    return router;
}