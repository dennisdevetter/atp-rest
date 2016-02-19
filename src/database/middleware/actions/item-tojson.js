import { validateRequiredArgument } from '../../../utils/argument-validation'
import { assignNewJsonValue } from './utils'

export default function () {
	
	return function toJson() {		
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
}
		