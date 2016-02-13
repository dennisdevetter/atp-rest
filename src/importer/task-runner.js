import controller from './controllers/scheduled-task-controller'
import Promise from 'bluebird'

function startTask(options){
	var { taskId, task } = options

	if (!taskId) {
		throw new Error('taskId cannot be null')
	}

	if (!task || typeof(task) !== 'function') {
		throw new Error('task cannot be null and must be a function')	
	}

	var executeTask = task

	return new Promise((resolve, reject) => {
		try {			
			controller.ensureTask(taskId).then((taskModel) => {	
				executeTask(taskModel).then(() => { 							
					controller.finishTask(taskModel).then(resolve).catch(reject)
				}).catch((err) => {					
					controller.finishTask(taskModel, err).then(() => reject(err)).catch(reject)
				})			
			}).catch(reject)
		}
		catch(error) {				
			reject(error)
		}
	})
}


export default {
	startTask
}
