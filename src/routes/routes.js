	export default function(options) {
		
		var api = require('./api').default(options);
		var auth = require('./auth').default(options);
		var users = require('./users').default(options);
		var players = require('./players').default(options);

		return [
			...api,
			...auth,
			...users,
			...players
		];
	}