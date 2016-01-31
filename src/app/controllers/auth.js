import express from 'express';
import { normalizeRequest, authorizeRequest, createToken} from '../middleware/auth';

export default function createController(options) {
	var router = express.Router();

	router.route('/auth')
		  .post(normalizeRequest)
		  .post(authorizeRequest)
		  .post(createToken(options));

    return router;
}