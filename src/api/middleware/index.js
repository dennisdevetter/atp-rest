import { encodedBodyParser, jsonBodyParser, requestLogger, indexHttpRequest} from './misc';

export function createRequestPipeline(options) {
	return {
		encodedBodyParser : encodedBodyParser(options),
		jsonBodyParser : jsonBodyParser(options),
		requestLogger : requestLogger(options)
	}
}

export function createApiEndpoint(endpoint) {	
	return indexHttpRequest(endpoint);	
}

export default {
	createRequestPipeline,
	createApiEndpoint
}