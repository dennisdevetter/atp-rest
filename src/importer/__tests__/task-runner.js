import ScheduledTaskModel from '../../database/models/scheduled-task-model'
import sut_taskRunner from '../task-runner'

describe('task runner',() => {    	

	it('should have a method startTask', () => {                            					
		expect(sut_taskRunner.startTask).to.not.be.empty
		expect(typeof sut_taskRunner.startTask).to.equal('function')	
	})			

	it('should throw an error when the task id is not supplied', () => {                            			
		var options = { taskId: null }
		expect(sut_taskRunner.startTask.bind(sut_taskRunner, options)).to.throw('taskId cannot be null')
	})			

	it ('should throw an error when the task function is not supplied', () => {
		var options = { taskId: 'the task id', task: null}
		expect(sut_taskRunner.startTask.bind(sut_taskRunner, options)).to.throw('task cannot be null and must be a function')
	})

	it ('should resolve a task, create a new model and execute the task ', (done) => {				
		// arrange
		var options = { taskId: 'test_task', task: () => createResolvedPromise() }      
      	var findTask = root.sandbox.stub(ScheduledTaskModel, 'findOne').returns(createResolvedPromise(null))            	
      	var scheduledTaskModel = { 
      		taskId: options.taskId,	lastExecutedOn: null, status: null,
      		save : () => createResolvedPromise(scheduledTaskModel)
      	}
      	var createModel = root.sandbox.stub(ScheduledTaskModel, 'create').returns(scheduledTaskModel)      
      	var saveScheduledTaskModel = sinon.spy(scheduledTaskModel, 'save')   
      	var taskToRun = sinon.spy(options, 'task')

		// act
		var taskPromise = sut_taskRunner.startTask(options)

      	// assert
      	taskPromise.then(() => {      		
      		expect(saveScheduledTaskModel).to.have.been.called       
      		expect(createModel).to.have.been.calledWith({ taskId: options.taskId })   
      		expect(taskToRun).to.have.been.calledWith(scheduledTaskModel)
      		expect(scheduledTaskModel.lastExecutedOn).to.not.be.empty
      		expect(scheduledTaskModel.status).to.equal(1)
      		expect(scheduledTaskModel.taskId).to.equal(options.taskId)
      		done()
      	})	
	})

	it ('should resolve a task, fetch the task model and execute the task ', (done) => {				
		// arrange
		var options = { taskId: 'test_task', task: () => createResolvedPromise() }            	
      	var scheduledTaskModel = { 
      		taskId: options.taskId,	lastExecutedOn: null, status: null,
      		save : () => createResolvedPromise(scheduledTaskModel)
      	}
      	var findTask = root.sandbox.stub(ScheduledTaskModel, 'findOne').returns(createResolvedPromise(scheduledTaskModel))            	      	
      	var saveScheduledTaskModel = sinon.spy(scheduledTaskModel, 'save')   
      	var taskToRun = sinon.spy(options, 'task')

		// act
		var taskPromise = sut_taskRunner.startTask(options)

      	// assert
      	taskPromise.then(() => {      		
      		expect(saveScheduledTaskModel).to.have.been.called       
      		expect(taskToRun).to.have.been.calledWith(scheduledTaskModel)
      		expect(scheduledTaskModel.lastExecutedOn).to.not.be.empty
      		expect(scheduledTaskModel.status).to.equal(1)
      		expect(scheduledTaskModel.taskId).to.equal(options.taskId)
      		done()
      	})	
	})

	it ('should reject a task if the external task fails ', (done) => {		
		// arrange
		var options = { taskId: 'test_task', task: () => createRejectedPromise('error during executing task') }              
      	var scheduledTaskModel = { 
      		taskId: options.taskId,	lastExecutedOn: null, status: null,
      		save : () => createResolvedPromise(scheduledTaskModel)
      	}
  		var findTask = root.sandbox.stub(ScheduledTaskModel, 'findOne').returns(createResolvedPromise(scheduledTaskModel))          

		// act
		var taskPromise = sut_taskRunner.startTask(options)

      	// assert
      	taskPromise.catch((error) => {      		
      		expect(error).to.equal('error during executing task')
      		expect(scheduledTaskModel.lastExecutedOn).to.not.be.empty
      		expect(scheduledTaskModel.status).to.equal(2)
      		expect(scheduledTaskModel.taskId).to.equal(options.taskId)
      		done()
      	})	
	})

	it ('should reject a task if an error occurs fetching the task model ', (done) => {				

		// arrange
		var options = { taskId: 'test_task', task: () => createResolvedPromise() }      
		var findTask = root.sandbox.stub(ScheduledTaskModel, 'findOne').returns(createRejectedPromise('some error'))   

		// act
		var taskPromise = sut_taskRunner.startTask(options)

		// assert
		taskPromise.catch((error) => {		
			expect(error).to.equal('some error')
			done()
		})
	})

	it ('should reject a task if the created task model is null ', (done) => {				

		// arrange
		var options = { taskId: 'test_task', task: () => createResolvedPromise() }      
		var findTask = root.sandbox.stub(ScheduledTaskModel, 'findOne').returns(createResolvedPromise(null))   
		var createModel = root.sandbox.stub(ScheduledTaskModel, 'create').returns(null)      

		// act
		var taskPromise = sut_taskRunner.startTask(options)

		// assert
		taskPromise.catch((error) => {		
			expect(error).to.equal('failed to create the model with task id ' + options.taskId)
			done()
		})
	})

	it ('should reject a task if an error occurs creating a new task model ', (done) => {				
		// arrange
		var options = { taskId: 'test_task', task: () => createResolvedPromise() }      
		var findTask = root.sandbox.stub(ScheduledTaskModel, 'findOne').returns(createResolvedPromise(null))   
		var scheduledTaskModel = {       		
      		save : () => createRejectedPromise('error during save')
      	}
		var createModel = root.sandbox.stub(ScheduledTaskModel, 'create').returns(scheduledTaskModel)      

		// act
		var taskPromise = sut_taskRunner.startTask(options)

		// assert
		taskPromise.catch((error) => {		
			expect(error).to.equal('error during save')
			done()
		})
	})	
})  


function createResolvedPromise(resolvedValue) {
	return new Promise((resolve, reject) => resolve(resolvedValue))	
}

function createRejectedPromise(error) {
	return new Promise((resolve, reject) => reject(error))		
}
