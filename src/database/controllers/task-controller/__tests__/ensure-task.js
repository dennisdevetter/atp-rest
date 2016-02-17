import TaskModel from '../../../../database/models/task-model'
var ensureTask = require('../ensure-task')	
var sut_ensureTask = ensureTask.default

describe('database', () => {
  describe('controllers', () => {
		describe('task controller',() => {
			describe('ensure task', () => {
				it ('should throw exception if the task id is null', () => {		
					var options = null
					expect(ensureTask.default.bind(ensureTask, options)).to.throw('taskId cannot be null')
				})

				it ('should resolve the task model if it is found', (done) => {		
					// arrange
					var taskId = 'task id'
					var taskModel = {}						
					var findTask = root.sandbox.stub(TaskModel, 'findOne').returns(Promise.resolve(taskModel))    

					// act
					var promise = sut_ensureTask(taskId)

					// assert
					promise.then((result) => {
						expect(result).to.equal(taskModel)
						done()
					}).catch(done)
				})

				it ('should create the task model if it is not found and resolve it', (done) => {		
					// arrange
					var createTask = require('../create-task')
					var options = { taskId: 'task id' }			
					var { taskId } = options
					var taskModel = { taskId: 'bla' }
					var findTask = root.sandbox.stub(TaskModel, 'findOne').returns(Promise.resolve(null))    		
					var createTaskStub = root.sandbox.stub(createTask, 'default').returns(Promise.resolve(taskModel))
				
					// act
					var promise = sut_ensureTask(taskId)

					// assert
					promise.then((result) => {
						expect(createTaskStub).to.have.been.calledWith({ taskId })
						expect(result).to.equal(taskModel)
						done()
					}).catch(done)
				})
			})
		})
	})
})