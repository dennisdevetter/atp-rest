import match from './match-utils'

export default function queryMatch(filter) {
	return new Promise((resolve, reject) => {				

		return match.query(filter)
							  .then(match.toJson)
							  .then(resolve)
							  .catch(reject)
	})
}