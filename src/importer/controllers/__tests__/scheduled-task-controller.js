import ScheduledTaskModel from '../../../database/models/scheduled-task-model'
import sut_scheduledTaskController from '../scheduled-task-controller'
import helper from '../../../../test/setup/helpers'

describe('scheduled task controller',() => {   
 	describe('get task',() => {   
		it ('should get the task for the given task id', (done) => {		
			// arrange
			var taskId= 'task id'
			var taskModel = {}
			var findTask = root.sandbox.stub(ScheduledTaskModel, 'findOne').returns(helper.createResolvedPromise(taskModel))    

			// act
			var promise = sut_scheduledTaskController.getTask(taskId)

			// assert
			promise.then(() => {
				expect(findTask).to.have.been.calledWith({ taskId })
				done()
			}).catch(done)
		})

		it ('should throw exception if the task id is null', () => {		
			var taskId = null
			expect(sut_scheduledTaskController.getTask.bind(sut_scheduledTaskController, taskId)).to.throw('taskId cannot be null')
		})
	})

	describe('create task',() => {   
		it ('should reject if the created task model throws an exception', (done) => {		
			// arrange
			var taskId = 'task id'
			var options = { taskId }
			var somethingWentWrong = new Error('error creating model')
			var createModel = root.sandbox.stub(ScheduledTaskModel, 'create').throws(somethingWentWrong)      

			// act
			var promise = sut_scheduledTaskController.createTask(options)

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
	      		save : () => helper.createResolvedPromise(taskModel)
	      	}
			var createModel = root.sandbox.stub(ScheduledTaskModel, 'create').returns(taskModel) 

			// act
			var promise = sut_scheduledTaskController.createTask(options)

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
	      		save : () => helper.createRejectedPromise('error saving')
	      	}
			var createModel = root.sandbox.stub(ScheduledTaskModel, 'create').returns(taskModel) 
			var saveSpy = sinon.spy(taskModel, 'save')

			// act
			var promise = sut_scheduledTaskController.createTask(options)

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
			var createModel = root.sandbox.stub(ScheduledTaskModel, 'create').throws(somethingWentWrong)      

			// act
			var promise = sut_scheduledTaskController.createTask(options)

			// assert
			promise.catch((error) => {				
				expect(createModel).to.have.been.calledWith({ taskId })				
				expect(error).to.equal(somethingWentWrong)
				done()
			})
		})

		it ('should throw exception if the task id is null', () => {		
			var options = null
			expect(sut_scheduledTaskController.createTask.bind(sut_scheduledTaskController, options)).to.throw('taskId cannot be null')
		})
	})

	describe('finish task',() => {   
		it('should throw error if the task model is null', () => {
			var taskModel = null
			expect(sut_scheduledTaskController.finishTask.bind(sut_scheduledTaskController, taskModel)).to.throw('taskModel cannot be null')
		})

		function save(error, done) {
			// arrange			
			var taskModel = { 	      	
				taskId: 'task id',	
				lastExecutedOn: null,
				status: null,
	      		save : () => helper.createResolvedPromise(taskModel)
	      	}

			// act
			var promise = sut_scheduledTaskController.finishTask(taskModel, error)

			// assert
			promise.then((result) => {												
				expect(result).to.equal(taskModel)		
				expect(taskModel.lastExecutedOn).to.not.be.empty				
				expect(taskModel.status).to.equal(error ? 2 : 1)								
				done()
			}).catch(done)
		}

		it('should save without error and return the updated task model ', (done) => {
			save(null, done)
		})

		it('should save with error and return the updated task model ', (done) => {
			save('an error occured', done)
		})
	})

	describe('ensure task',() => {   
		it ('should throw exception if the task id is null', () => {		
			var options = null
			expect(sut_scheduledTaskController.ensureTask.bind(sut_scheduledTaskController, options)).to.throw('taskId cannot be null')
		})

		it ('should resolve the task model if it is found', (done) => {		
			// arrange
			var taskId = 'task id'
			var taskModel = {}						
			var findTask = root.sandbox.stub(ScheduledTaskModel, 'findOne').returns(helper.createResolvedPromise(taskModel))    

			// act
			var promise = sut_scheduledTaskController.ensureTask(taskId)

			// assert
			promise.then((result) => {
				expect(result).to.equal(taskModel)
				done()
			}).catch(done)

		})

		it ('should create the task model if it is not found and resolve it', (done) => {		
			// arrange
			var taskId = 'task id'
			var taskModel = {save : () => helper.createResolvedPromise(taskModel)}						
			var findTask = root.sandbox.stub(ScheduledTaskModel, 'findOne').returns(helper.createResolvedPromise(null))    
			var createModel = root.sandbox.stub(ScheduledTaskModel, 'create').returns(taskModel) 

			// act
			var promise = sut_scheduledTaskController.ensureTask(taskId)

			// assert
			promise.then((result) => {
				expect(result).to.equal(taskModel)
				done()
			}).catch(done)

		})
	})
})