import ScheduledTaskModel from '../database/models/scheduled-task-model'
import Promise from 'bluebird'

const statusses = {
	success : 1,
	error : 2
}

function getTaskModel(taskId){
	return ScheduledTaskModel.findOne({taskId})
}

function getStatusMessage(status){
	switch(status) {		
		case statusses.success:
			return 'succesfully'
		case statusses.error:
			return 'failed'
		default:
			return '(not yet)'
	}
}

function updateTaskModel(taskModel, status = 1){
	
	taskModel.lastExecutedOn = Date.now()
	taskModel.status = status

	return taskModel.save().then(() => {
		var statusMessage = getStatusMessage(status)
		var dateString = new Date(taskModel.lastExecutedOn)
		console.log(`task was executed on ${dateString} with status: ${statusMessage}`)
	})
}

function startTask(options){
	var { taskId, task } = options
	var taskModel

	return new Promise((resolve, reject) => {
		try {			
			getTaskModel(taskId).then((model) => {
				taskModel = model				
				if (!taskModel) {					
					taskModel = new ScheduledTaskModel({ taskId })
					
					taskModel.save().then(() =>  {						
						task(null).then(() => { 							
							updateTaskModel(taskModel, statusses.success).then(resolve)
						}).catch((err) => {
							updateTaskModel(taskModel, statusses.error).then(() => reject(err))
						})
					})
				}
				else {
					var { lastExecutedOn, status } = taskModel

					task({ lastExecutedOn, status }).then(() => { 							
						updateTaskModel(taskModel, statusses.success).then(resolve)
					}).catch((err) => {
						updateTaskModel(taskModel, statusses.error).then(() => reject(err))
					})
				}
			})
		}
		catch(error) {			
			if (taskModel) {
				updateTaskModel(taskModel, statusses.error).then(() => reject(error))									
			} else {
				reject(error)
			}		
		}
	})
}


export default {
	startTask
}
