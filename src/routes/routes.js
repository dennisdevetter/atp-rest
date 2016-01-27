	export default function({ app }) {
		
		var api = require('./api-routes').default({ app });
		var auth = require('./auth-routes').default({ app });
		var users = require('./user-routes').default({ app });
		var players = require('./player-routes').default({ app });

		return [
			...api,
			...auth,
			...users,
			...players
		];
	}