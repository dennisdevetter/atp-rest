import TaskModel from '../../../database/models/task-model'
import taskController from '../../../database/controllers/task-controller'

var finishTask = require('../finish-task')
var startTask = require('../start-task')	
var sut_startTask = startTask.default

export default function tests() {
	describe('start task', () => {
		it('should throw error if the task id is null', () => {
			var options = { taskId: null }
			expect(startTask.default.bind(startTask, options)).to.throw('taskId cannot be null')
		})

		it('should throw error if the task is null', () => {
			var options = { taskId: 'task id', task: null }
			expect(startTask.default.bind(startTask, options)).to.throw('task cannot be null and must be a function')
		})
		
		it('should throw error if the task is not a function', () => {
			var options = { taskId: 'task id', task: 'not a function'  }
			expect(startTask.default.bind(startTask, options)).to.throw('task cannot be null and must be a function')
		})

		it('should start the task and resolve the finished task model', (done) => {						
			var taskId = 'task id'
			var options = { taskId, task: () => Promise.resolve() }
			var taskModel = { taskId }
			var ensureTaskStub = root.sandbox.stub(taskController, 'ensureTask').returns(Promise.resolve(taskModel))
			var finishTaskStub = root.sandbox.stub(finishTask, 'default').returns(Promise.resolve())
			var taskSpy = sinon.spy(options, 'task')
			
			var promise = sut_startTask(options)

			promise.then((result) => {
				expect(ensureTaskStub).to.have.been.calledWith(taskId)
				expect(taskSpy).to.have.been.calledWith(taskModel)
				expect(finishTaskStub).to.have.been.calledWith(taskModel)
				done()
			}).catch(done)
		})

		it('should reject when the task model cannot be ensured', (done) => {			
			var taskId = 'task id'
			var somethingWentWrong = 'error'
			var options = { taskId, task: () => Promise.resolve() }
			var taskModel = { taskId }				
			var ensureTaskStub = root.sandbox.stub(taskController, 'ensureTask').returns(Promise.reject(somethingWentWrong))			

			var promise = sut_startTask(options)

			promise.catch((error) => {		
				expect(error).to.equal(somethingWentWrong)
				done()
			})
		})

		it('should reject when finishing the task model fails', (done) => {
			var taskId = 'task id'
			var somethingWentWrong = 'error'
			var options = { taskId, task: () => Promise.resolve() }
			var taskModel = { taskId }				
			var ensureTaskStub = root.sandbox.stub(taskController, 'ensureTask').returns(Promise.resolve(taskModel))
			var finishTaskStub = root.sandbox.stub(finishTask, 'default').returns(Promise.reject(somethingWentWrong))		
			var taskSpy = sinon.spy(options, 'task')

			var promise = sut_startTask(options)

			promise.catch((error) => {		
				expect(ensureTaskStub).to.have.been.calledWith(taskId)
				expect(taskSpy).to.have.been.calledWith(taskModel)
				expect(error).to.equal(somethingWentWrong)
				done()
			})
		})

		it('should reject and finish the task model when the task fails', (done) => {
			var taskId = 'task id'
			var somethingWentWrong = 'error'
			var options = { taskId, task: () => Promise.reject(somethingWentWrong) }
			var taskModel = { taskId }				
			var ensureTaskStub = root.sandbox.stub(taskController, 'ensureTask').returns(Promise.resolve(taskModel))	
			var finishTaskStub = root.sandbox.stub(finishTask, 'default').returns(Promise.resolve())		
			
			var promise = sut_startTask(options)

			promise.catch((error) => {		
				expect(ensureTaskStub).to.have.been.calledWith(taskId)				
				expect(finishTaskStub).to.have.been.calledWith(taskModel, somethingWentWrong)
				expect(error).to.equal(somethingWentWrong)
				done()
			})
		})

		it('should reject when finishing the task model fails on a failed task', (done) => {
			var taskId = 'task id'
			var somethingWentWrong = 'error'
			var options = { taskId, task: () => Promise.reject(somethingWentWrong) }
			var taskModel = { taskId }				
			var ensureTaskStub = root.sandbox.stub(taskController, 'ensureTask').returns(Promise.resolve(taskModel))	
			var finishTaskStub = root.sandbox.stub(finishTask, 'default').returns(Promise.reject(somethingWentWrong))			
			
			var promise = sut_startTask(options)

			promise.catch((error) => {		
				expect(ensureTaskStub).to.have.been.calledWith(taskId)				
				expect(finishTaskStub).to.have.been.calledWith(taskModel, somethingWentWrong)
				expect(error).to.equal(somethingWentWrong)
				done()
			})
		})

	})
}