import ScheduledTaskModel from '../../database/models/scheduled-task-model'

const statusses = {
	success : 1,
	error : 2
}

function getTask(taskId) {
	validateRequiredArgument({taskId})

	var options = { taskId }
	return ScheduledTaskModel.findOne(options)
}

function ensureTask(taskId){	
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

function createTask(options) {	
	var { taskId } = options || {}
	validateRequiredArgument({ taskId })

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
	validateRequiredArgument({ taskModel })	

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

function validateRequiredArgument(options) {
	var keys = Object.keys(options)
	if (keys.length > 0) {
		keys.forEach((key) => {
			if (!options[key]) {
				throw Error(`${key} cannot be null`)
			}
		})
	}
}

export default {
	getTask,
	ensureTask,
	createTask,
	finishTask
}