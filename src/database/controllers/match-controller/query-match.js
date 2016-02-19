import createFluentMatchPromise from '../../middleware/match'

export default function queryMatch(filter) {
	return new Promise((resolve, reject) => {				

		var match = createFluentMatchPromise()

		match.query(filter)
				 .toJson()
				 .then(resolve)
				 .catch(reject)
	})
}