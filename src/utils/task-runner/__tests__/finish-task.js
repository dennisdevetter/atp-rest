import TaskModel from '../../../database/models/task-model'
import Promise from 'bluebird'
var finishTask = require('../finish-task')	
var sut_finishTask = finishTask.default

export default function tests() {
	describe('finish task', () => {
		it('should throw error if the task model is null', () => {
			var taskModel = null
			expect(finishTask.default.bind(finishTask, taskModel)).to.throw('taskModel cannot be null')
		})

		it('should save the task model without error and return the task model ', (done) => {
			finishTaskAndSave(null, done)
		})

		it('should save the task model with error and return the task model ', (done) => {
			finishTaskAndSave('an error occured', done)
		})
	})
}

function finishTaskAndSave(error, done) {
	// arrange			
	var taskModel = { 	      	
		taskId: 'task id',	
		lastExecutedOn: null,
		status: null,
  		save : () => Promise.resolve(taskModel)
  	}

	// act
	var promise = sut_finishTask(taskModel, error)

	// assert
	promise.then((result) => {												
		expect(result).to.equal(taskModel)		
		expect(taskModel.lastExecutedOn).to.not.be.empty				
		expect(taskModel.status).to.equal(error ? 2 : 1)								
		done()
	}).catch(done)
}