import match from './match-utils'

export default function getMatch(json) {
	return new Promise((resolve, reject) => {				

		return match.get(json)
							  .then(match.toJson)
							  .then(resolve)
							  .catch(reject)
	})
}