import TaskModel from '../../models/task-model'
import { validateRequiredArgument } from '../../../utils/argument-validation'

export default function createTask(options) {		
	var { taskId } = options || {}
	validateRequiredArgument({ taskId })

	return new Promise((resolve, reject) => {
		try {			
			var model = TaskModel.create({ taskId })
			if (model) {
				model.save().then(() => {				
					// todo add the id to the model
					resolve(model)
				}).catch(reject)		
			} else {
				reject('failed to create the model with task id ' + taskId)
			}			
		}
		catch(error) {			
			reject(error)
		}
	})
}

