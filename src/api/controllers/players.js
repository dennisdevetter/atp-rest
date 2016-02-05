import express from 'express';
import { decodeToken as createAuthorizeRequest } from '../middleware/auth';
import { listPlayers} from '../middleware/players';

export default function createController(options) {
	var router = express.Router();
	var authorize = createAuthorizeRequest(options);

	let routeName = '/players';

	router.route(routeName)
		.get(authorize)
		.get(listPlayers);

    return router;
}