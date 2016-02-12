import ScheduledTaskModel from '../../database/models/scheduled-task-model'

const statusses = {
	success : 1,
	error : 2
}

function getTask(taskId) {
	var options = { taskId }
	return ScheduledTaskModel.findOne(options)
}

function ensureTask(taskId){	
	return new Promise((resolve, reject) => {		
		getTask(taskId).then((model) => {				
			if (!model) {					
				createTaskModel(options).then(resolve).catch(reject)
			} else {
				resolve(model)
			}				
		}).catch(reject)
	})
}

function createTask(options) {	
	var { taskId } = options
	return new Promise((resolve, reject) => {
		try {			
			var model = ScheduledTaskModel.create({ taskId })
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

function finishTask(taskModel, error){
	return new Promise((resolve, reject) => {
		try {
			taskModel.lastExecutedOn = Date.now()
			taskModel.status = error ? statusses.error : statusses.success

			taskModel.save().then(() => {
				resolve(taskModel)
			}).catch(reject)
		} 
		catch(error) {
			reject(error)
		}	
	})	
}


export default {
	getTask,
	ensureTask,
	createTask,
	finishTask
}