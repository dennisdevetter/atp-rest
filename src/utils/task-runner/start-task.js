import finishTask from './finish-task'
import taskController from '../../database/controllers/task-controller'

export default function startTask(options){
	var { taskId, task } = options

	if (!taskId) {
		throw new Error('taskId cannot be null')
	}

	if (!task || typeof(task) !== 'function') {
		throw new Error('task cannot be null and must be a function')	
	}

	return new Promise((resolve, reject) => {
		try {			
			taskController.ensureTask(taskId).then((taskModel) => {	
				task(taskModel).then(() => { 							
					finishTask(taskModel).then(resolve).catch(reject)
				}).catch((err) => {					
					finishTask(taskModel, err).then(() => reject(err)).catch(reject)
				})			
			}).catch(reject)
		}
		catch(error) {				
			reject(error)
		}
	})
}
