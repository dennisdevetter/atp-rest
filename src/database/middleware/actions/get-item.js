import { validateRequiredArgument } from '../../../utils/argument-validation'

export default function (options) {
	
	var { dbModel, keySelector } = options || {}

	return function get(json) {
		validateRequiredArgument({ json })			

		return () => {		
			return new Promise((resolve, reject) => {				
				function resolveInstance(model) {		
					var value = Object.assign({}, { model, json })
					resolve(value)
				}

				if (json.id) {			
					dbModel.findOne({_id : json.id}).then(resolveInstance).catch(reject)
					return
				} 

				var filter = keySelector(json)
				if (filter) {
					dbModel.findOne(filter).then(resolveInstance).catch(reject)
					return
				}

				resolve(null)
			})	
		}
	}
}