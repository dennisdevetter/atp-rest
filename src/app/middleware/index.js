import encodedBodyParser from './encoded-body-parser';
import jsonBodyParser from './json-body-parser';
import requestLoggerPipe from './request-logger';
import indexHttpRequest from './index-http-request';

export function createRequestPipeline(options) {
	return {
		encodedBodyParser : encodedBodyParser(options),
		jsonBodyParser : jsonBodyParser(options),
		requestLogger : requestLoggerPipe(options)
	}
}

export function createApiEndpoint(endpoint) {	
	return indexHttpRequest(endpoint);	
}