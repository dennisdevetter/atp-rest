import express from 'express';
import createAuthorizeRequestPipe from '../../middleware/decode-token';
import normalizeSaveRequest from './normalize-save-request';
import listUsers from './list-users';
import removeUsers from './remove-users';
import saveUsers from './save-users';

export default function createController(options) {
	var router = express.Router();
	var authorize = createAuthorizeRequestPipe(options);

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