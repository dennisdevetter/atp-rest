import ScheduledTaskModel from '../database/models/scheduled-task-model'
import Promise from 'bluebird'

const statusses = {
	success : 1,
	error : 2
}

function getTaskModel(taskId){	
	return new Promise((resolve, reject) => {
		var options = { taskId }
		ScheduledTaskModel.findOne(options).then((model) => {				
			if (!model) {					
				createTaskModel(options).then(resolve).catch(reject)
			} else {
				resolve(model)
			}				
		}).catch(reject)
	})
}

function createTaskModel(options) {	
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

function updateTaskModel(taskModel, error){
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

function startTask(options){
	var { taskId, task } = options

	if (!taskId) {
		throw new Error('taskId cannot be null')
	}

	if (!task || typeof(task) !== 'function') {
		throw new Error('task cannot be null and must be a function')	
	}

	return new Promise((resolve, reject) => {
		try {			
			getTaskModel(taskId).then((taskModel) => {	
				task(taskModel).then(() => { 							
					updateTaskModel(taskModel).then(resolve).catch(reject)
				}).catch((err) => {					
					updateTaskModel(taskModel, err).then(() => reject(err)).catch(reject)
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
