import TaskModel from '../../../../database/models/task-model'
var getTask = require('../get-task')
var sut_getTask = getTask.default

export default function tests() {
	describe('get task', () => {
		it ('should get the task for the given task id', (done) => {		
			// arrange
			var taskId= 'task id'
			var taskModel = {}
			var findTask = root.sandbox.stub(TaskModel, 'findOne').returns(Promise.resolve(taskModel))    

			// act
			var promise = sut_getTask(taskId)

			// assert
			promise.then(() => {
				expect(findTask).to.have.been.calledWith({ taskId })
				done()
			}).catch(done)
		})

		it ('should throw exception if the task id is null', () => {		
			var taskId = null
			expect(getTask.default.bind(getTask, taskId)).to.throw('taskId cannot be null')
		})
	})
}