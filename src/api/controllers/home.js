import express from 'express';
import { welcomeRequest } from '../middleware/home';

export default function createController(options) {
	var router = express.Router();

	router.route('/')
		  .get(welcomeRequest);

    return router;
}