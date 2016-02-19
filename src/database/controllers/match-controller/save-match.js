import createFluentMatchPromise from '../../middleware/match'

export default function saveMatch(json) {
	return new Promise((resolve, reject) => {				

		var match = createFluentMatchPromise()
		
		match.get(json)
				 .save()
				 .toJson()
				 .then(resolve)
				 .catch(reject)
	})
}