import TaskModel from '../../../../database/models/task-model'
import Promise from 'bluebird'

var createTask = require('../create-task')
var sut_createTask = createTask.default

export default function tests() {
	describe('create task', () => {
		it ('should reject if the created task model throws an exception', (done) => {		
			// arrange
			var taskId = 'task id'
			var options = { taskId }
			var somethingWentWrong = new Error('error creating model')
			var createModel = root.sandbox.stub(TaskModel, 'create').throws(somethingWentWrong)      

			// act
			var promise = sut_createTask(options)

			// assert
			promise.catch((error) => {				
				expect(createModel).to.have.been.calledWith({ taskId })				
				expect(error).to.equal(somethingWentWrong)
				done()
			})
		})

		it ('should resolve if the task model is created', (done) => {		
			// arrange
			var taskId = 'task id'
			var options = { taskId }
			var taskModel = { 	      	
				taskId,	
	      		save : () => Promise.resolve(taskModel)
	      	}
			var createModel = root.sandbox.stub(TaskModel, 'create').returns(taskModel) 

			// act
			var promise = sut_createTask(options)

			// assert
			promise.then((result) => {
				expect(createModel).to.have.been.calledWith({ taskId })		
				expect(result).to.equal(taskModel)						
				done()
			}).catch(done)
		})

		it ('should reject if the task model cannot be saved', (done) => {		
			// arrange
			var taskId = 'task id'
			var options = { taskId }
			var taskModel = { 	      	
				taskId,	
	      		save : () => Promise.reject('error saving')
	      	}
			var createModel = root.sandbox.stub(TaskModel, 'create').returns(taskModel) 
			var saveSpy = sinon.spy(taskModel, 'save')

			// act
			var promise = sut_createTask(options)

			// assert
			promise.catch((error) => {				
				expect(createModel).to.have.been.calledWith({ taskId })				
				expect(saveSpy).to.have.been.called
				expect(error).to.equal('error saving')
				done()
			})
		})

		it ('should reject if the created task model throws an exception', (done) => {		
			// arrange
			var taskId = 'task id'
			var options = { taskId }
			var somethingWentWrong = new Error('error creating model')
			var createModel = root.sandbox.stub(TaskModel, 'create').throws(somethingWentWrong)      

			// act
			var promise = sut_createTask(options)

			// assert
			promise.catch((error) => {				
				expect(createModel).to.have.been.calledWith({ taskId })				
				expect(error).to.equal(somethingWentWrong)
				done()
			})
		})

		it ('should throw exception if the task id is null', () => {		
			var options = null
			expect(createTask.default.bind(createTask, options)).to.throw('taskId cannot be null')
		})
	})
}