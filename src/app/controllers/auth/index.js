import express from 'express';
import normalizeRequest from './normalize-request';
import authorizeRequest from './authorize';
import createResponseToken from './create-token';

export default function createController(options) {
	var router = express.Router();

	router.route('/auth')
		  .post(normalizeRequest)
		  .post(authorizeRequest)
		  .post(createResponseToken(options));

    return router;
}