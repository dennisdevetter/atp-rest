import { validateRequiredArgument } from '../../../utils/argument-validation'

export default function (options) {
	
	var { dbModel } = options

	return function query(json) {	
		validateRequiredArgument({ json })

		return () => {		
			return new Promise((resolve, reject) => {					
				function resolveInstances(models) {									
					var instances = []
					if (models && models.length) {
						models.forEach((item) => instances.push(item))
					}												
					resolve({ list: instances})
				}

				dbModel.find(json).then(resolveInstances).catch(reject)
			})	
		}
	}
}
		