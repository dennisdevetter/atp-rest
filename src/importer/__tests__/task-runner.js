import ScheduledTaskModel from '../../database/models/scheduled-task-model'
import controller from '../controllers/scheduled-task-controller'
import sut_taskRunner from '../task-runner'
import helper from '../../../test/setup/helpers'

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

	it ('should execute and resolve the task', (done) => {				
		// arrange
		var options = { taskId: 'test_task', task: () => helper.createResolvedPromise() }            	
      	var scheduledTaskModel = { taskId: options.taskId,	lastExecutedOn: null, status: null }
      	var getTask = root.sandbox.stub(controller, 'getTask').returns(helper.createResolvedPromise(scheduledTaskModel))    
      	var finishTask = root.sandbox.stub(controller, 'finishTask').returns(helper.createResolvedPromise(null))    

		// act
		var taskPromise = sut_taskRunner.startTask(options)

      	// assert
      	taskPromise.then(() => {      		
      		expect(getTask).to.have.been.calledWith(options.taskId)            		
      		expect(finishTask).to.have.been.calledWith(scheduledTaskModel)             		      		
      		done()
      	})	
	})

	it ('should reject the task if getting the task model fails', (done) => {				
		// arrange
		var options = { taskId: 'test_task', task: () => helper.createResolvedPromise() }            	      	
      	var getTask = root.sandbox.stub(controller, 'getTask').returns(helper.createRejectedPromise('getTask error'))    
      	
		// act
		var taskPromise = sut_taskRunner.startTask(options)

      	// assert
      	taskPromise.catch((error) => {      		
      		expect(error).to.equal('getTask error')      		
      		done()
      	})	
	})

	it ('should reject the task if finishing the task model fails', (done) => {				
		// arrange
		var options = { taskId: 'test_task', task: () => helper.createResolvedPromise() }            	
      	var scheduledTaskModel = { taskId: options.taskId,	lastExecutedOn: null, status: null }
      	var getTask = root.sandbox.stub(controller, 'getTask').returns(helper.createResolvedPromise(scheduledTaskModel))    
      	var finishTask = root.sandbox.stub(controller, 'finishTask').returns(helper.createRejectedPromise('finishTask error'))    
      	
		// act
		var taskPromise = sut_taskRunner.startTask(options)

      	// assert
      	taskPromise.catch((error) => {      		
      		expect(error).to.equal('finishTask error')      		
      		done()
      	})	
	})

	it ('should reject the task if executing the task model fails', (done) => {				
		// arrange
		var options = { taskId: 'test_task', task: () => helper.createRejectedPromise('executed task error') }            	
      	var scheduledTaskModel = { taskId: options.taskId,	lastExecutedOn: null, status: null }
      	var getTask = root.sandbox.stub(controller, 'getTask').returns(helper.createResolvedPromise(scheduledTaskModel))    
      	var finishTask = root.sandbox.stub(controller, 'finishTask').returns(helper.createResolvedPromise())    
      	
		// act
		var taskPromise = sut_taskRunner.startTask(options)

      	// assert
      	taskPromise.catch((error) => {      		
      		expect(error).to.equal('executed task error')      	
      		expect(finishTask).to.have.been.calledWith(scheduledTaskModel, 'executed task error')	
      		done()
      	})	
	})
})  


