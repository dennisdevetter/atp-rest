import utils from './match-utils'

export default function getMatch(json) {
	return new Promise((resolve, reject) => {				
		
		var match = utils.createBuilder()

		match.get(json)
				 .toJson()
				 .then(resolve)
				 .catch(reject)
	})
}