import { validateRequiredArgument } from '../../utils/argument-validation'

export default function (options) {

	var { dbModel, keySelector } = options

	function get(json) {
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

	function query(json) {	
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

	function save() {
		return (options) => {
			return new Promise((resolve, reject) => {
					var { model, json } = options || {}				
					if (!model) {
							model = createModel(json)
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

	function toJson() {
		return (options) => {		
	 		return new Promise((resolve, reject) => {	 		
				var { model, json, list } = options || {}
				if (list) {
					var values = []
					list.length && list.forEach((item) => {
							var value = assignNewJsonValue(item)
							values.push(value)
					})
					resolve(values)
				}
				else {
					var value = assignNewJsonValue(model, json)
					resolve(value)			
				}
			})
		}
	}

	function assignNewJsonValue(model, json = {}) {
		var value = model ? Object.assign({ id: model._id }, json) : null
		return value
	}

	function createModel(json) {
		validateRequiredArgument({ json })	
		return dbModel.create(json)
	}

	return {
		get,
		query,
		save, 
		toJson
	}
}