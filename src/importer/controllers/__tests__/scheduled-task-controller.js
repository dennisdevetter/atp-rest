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
			})
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
			var scheduledTaskModel = { 	      	
				taskId,	
	      		save : () => helper.createResolvedPromise(scheduledTaskModel)
	      	}
			var createModel = root.sandbox.stub(ScheduledTaskModel, 'create').returns(scheduledTaskModel) 

			// act
			var promise = sut_scheduledTaskController.createTask(options)

			// assert
			promise.then((result) => {
				expect(createModel).to.have.been.calledWith({ taskId })		
				expect(result).to.equal(scheduledTaskModel)						
				done()
			})
		})

		it ('should reject if the task model cannot be saved', (done) => {		
			// arrange
			var taskId = 'task id'
			var options = { taskId }
			var scheduledTaskModel = { 	      	
				taskId,	
	      		save : () => helper.createRejectedPromise('error saving')
	      	}
			var createModel = root.sandbox.stub(ScheduledTaskModel, 'create').returns(scheduledTaskModel) 
			var saveSpy = sinon.spy(scheduledTaskModel, 'save')

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

	// it ('should resolve a task, fetch the task model and execute the task ', (done) => {				
	// 	// arrange
	// 	var options = { taskId: 'test_task', task: () => createResolvedPromise() }            	
 //      	var scheduledTaskModel = { 
 //      		taskId: options.taskId,	lastExecutedOn: null, status: null,
 //      		save : () => createResolvedPromise(scheduledTaskModel)
 //      	}
 //      	var findTask = root.sandbox.stub(ScheduledTaskModel, 'findOne').returns(createResolvedPromise(scheduledTaskModel))            	      	
 //      	var saveScheduledTaskModel = sinon.spy(scheduledTaskModel, 'save')   
 //      	var taskToRun = sinon.spy(options, 'task')

	// 	// act
	// 	var taskPromise = sut_scheduledTaskController.startTask(options)

 //      	// assert
 //      	taskPromise.then(() => {      		
 //      		expect(saveScheduledTaskModel).to.have.been.called       
 //      		expect(taskToRun).to.have.been.calledWith(scheduledTaskModel)
 //      		expect(scheduledTaskModel.lastExecutedOn).to.not.be.empty
 //      		expect(scheduledTaskModel.status).to.equal(1)
 //      		expect(scheduledTaskModel.taskId).to.equal(options.taskId)
 //      		done()
 //      	})	
	// })
})

	

	

	// it ('should reject a task if the external task fails ', (done) => {		
	// 	// arrange
	// 	var options = { taskId: 'test_task', task: () => createRejectedPromise('error during executing task') }              
 //      	var scheduledTaskModel = { 
 //      		taskId: options.taskId,	lastExecutedOn: null, status: null,
 //      		save : () => createResolvedPromise(scheduledTaskModel)
 //      	}
 //  		var findTask = root.sandbox.stub(ScheduledTaskModel, 'findOne').returns(createResolvedPromise(scheduledTaskModel))          

	// 	// act
	// 	var taskPromise = sut_taskRunner.startTask(options)

 //      	// assert
 //      	taskPromise.catch((error) => {      		
 //      		expect(error).to.equal('error during executing task')
 //      		expect(scheduledTaskModel.lastExecutedOn).to.not.be.empty
 //      		expect(scheduledTaskModel.status).to.equal(2)
 //      		expect(scheduledTaskModel.taskId).to.equal(options.taskId)
 //      		done()
 //      	})	
	// })

	// it ('should reject a task if an error occurs fetching the task model ', (done) => {				

	// 	// arrange
	// 	var options = { taskId: 'test_task', task: () => createResolvedPromise() }      
	// 	var findTask = root.sandbox.stub(ScheduledTaskModel, 'findOne').returns(createRejectedPromise('some error'))   

	// 	// act
	// 	var taskPromise = sut_taskRunner.startTask(options)

	// 	// assert
	// 	taskPromise.catch((error) => {		
	// 		expect(error).to.equal('some error')
	// 		done()
	// 	})
	// })

	// it ('should reject a task if the created task model is null ', (done) => {				

	// 	// arrange
	// 	var options = { taskId: 'test_task', task: () => createResolvedPromise() }      
	// 	var findTask = root.sandbox.stub(ScheduledTaskModel, 'findOne').returns(createResolvedPromise(null))   
	// 	var createModel = root.sandbox.stub(ScheduledTaskModel, 'create').returns(null)      

	// 	// act
	// 	var taskPromise = sut_taskRunner.startTask(options)

	// 	// assert
	// 	taskPromise.catch((error) => {		
	// 		expect(error).to.equal('failed to create the model with task id ' + options.taskId)
	// 		done()
	// 	})
	// })

	// it ('should reject a task if an error occurs creating a new task model ', (done) => {				
	// 	// arrange
	// 	var options = { taskId: 'test_task', task: () => createResolvedPromise() }      
	// 	var findTask = root.sandbox.stub(ScheduledTaskModel, 'findOne').returns(createResolvedPromise(null))   
	// 	var scheduledTaskModel = {       		
 //      		save : () => createRejectedPromise('error during save')
 //      	}
	// 	var createModel = root.sandbox.stub(ScheduledTaskModel, 'create').returns(scheduledTaskModel)      

	// 	// act
	// 	var taskPromise = sut_taskRunner.startTask(options)

	// 	// assert
	// 	taskPromise.catch((error) => {		
	// 		expect(error).to.equal('error during save')
	// 		done()
	// 	})
	// })	