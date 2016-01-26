const allowedMethods = ['GET', 'PUT', 'DELETE', 'POST'];

export default class ApiRoute {
	
	constructor(options){
		let { endpoint, handler, method = 'GET', isPublic = false } = options;

		if (!endpoint || endpoint.trim() === ''){
				throw Error('endpoint cannot be null');
		}

		method = method.trim().toUpperCase();
		if (allowedMethods.indexOf(method) == -1){
			throw Error(`method '${method}' is not allowed`);	
		}

		if (!handler || typeof handler !== 'function'){
			throw Error('handler cannot be null and must be a function');		
		}

		this.endpoint = endpoint;		
		this.handler = handler;
		this.method = method;
		this.isPublic = isPublic;
	}
};

