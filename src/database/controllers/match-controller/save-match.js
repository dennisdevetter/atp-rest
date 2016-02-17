import match from './match-utils'

export default function saveMatch(json) {
	return new Promise((resolve, reject) => {				

		match.get(json).then(match.save)
							     .then(match.toJson)
							     .then(resolve)
							     .catch(reject)
	})
}