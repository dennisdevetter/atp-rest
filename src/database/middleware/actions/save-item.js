import { validateRequiredArgument } from '../../../utils/argument-validation'

export default function (options) {
	
	var { dbModel } = options

	return function save() {
		
		return (options) => {
			return new Promise((resolve, reject) => {
					var { model, json } = options || {}				
					
					if (!model) {
							model = dbModel.create(json)
					}

					function resolveInstance() {												
						var value = Object.assign({}, { model, json })					
						resolve(value)
					}
					
					model.save()
							   .then(() => resolveInstance())
							   .catch(reject)
				})
		}
	}
}
		