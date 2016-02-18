import utils from './match-utils'

export default function queryMatch(filter) {
	return new Promise((resolve, reject) => {				

		var match = utils.createBuilder()

		match.query(filter)
				 .toJson()
				 .then(resolve)
				 .catch(reject)
	})
}