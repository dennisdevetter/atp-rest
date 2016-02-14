import taskController from '../../database/controllers/task-controller'
import taskConstants from '../../database/constants/task'
import { validateRequiredArgument } from '../argument-validation'
import Promise from 'bluebird'

export function updateTaskModel(taskModel, options) {
	var { lastExecutedOn, status } = options

	taskModel.lastExecutedOn = lastExecutedOn
	taskModel.status = status
}

export default function finishTask(taskModel, error){	
	validateRequiredArgument({ taskModel })	

	return new Promise((resolve, reject) => {
		try {

			updateTaskModel(taskModel, {
				lastExecutedOn: Date.now(),
				status : error ? taskConstants.statusses.error : taskConstants.statusses.success
			})

			taskModel.save().then(() => {
				resolve(taskModel)
			}).catch(reject)
		} 
		catch(error) {
			reject(error)
		}	
	})	
}