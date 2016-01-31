import express from 'express';
import { decodeToken as createAuthorizeRequest } from '../middleware/auth';
import { normalizeSaveRequest, listUsers, removeUsers, saveUsers} from '../middleware/users';

export default function createController(options) {
	var router = express.Router();
	var authorize = createAuthorizeRequest(options);

	let routeName = '/users';

	router.route(routeName)
		.get(authorize)
		.get(listUsers);

	router.route(routeName)
		.post(authorize)
		.post(normalizeSaveRequest)
		.post(saveUsers);

	router.route(routeName)		
		.delete(authorize)
		.delete(removeUsers);

    return router;
}