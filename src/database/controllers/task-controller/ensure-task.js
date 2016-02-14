import { validateRequiredArgument } from '../../../utils/argument-validation'
import getTask from './get-task'
import createTask from './create-task'

export default function ensureTask(taskId) {	
	validateRequiredArgument({taskId})

	return new Promise((resolve, reject) => {		
		getTask(taskId).then((model) => {				
			if (!model) {							
				var options = { taskId }
				createTask(options).then(resolve).catch(reject)
			} else {
				resolve(model)
			}				
		}).catch(reject)
	})
}