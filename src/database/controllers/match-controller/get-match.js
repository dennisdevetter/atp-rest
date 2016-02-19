import createFluentMatchPromise from '../../middleware/match'

export default function getMatch(json) {
	return new Promise((resolve, reject) => {				
		
		var match = createFluentMatchPromise()

		match.get(json)
				 .toJson()
				 .then(resolve)
				 .catch(reject)
	})
}