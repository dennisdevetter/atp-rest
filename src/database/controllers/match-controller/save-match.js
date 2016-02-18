import utils from './match-utils'

export default function saveMatch(json) {
	return new Promise((resolve, reject) => {				

		var match = utils.createBuilder()
		
		match.get(json)
				 .save()
				 .toJson()
				 .then(resolve)
				 .catch(reject)
	})
}