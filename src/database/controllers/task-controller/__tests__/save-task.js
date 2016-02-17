import TaskModel from '../../../../database/models/task-model'
var saveTask = require('../save-task')
var sut_saveTask = saveTask.default

describe('database', () => {
  describe('controllers', () => {
		describe('task controller',() => {
			describe('save task', () => {
				it ('should throw exception if the task model is null', () => {		
					var options = null
					expect(saveTask.default.bind(saveTask, options)).to.throw('taskModel cannot be null')
				})	

				it('should save and resolve the task model', (done) => {
					var taskModel = { save: () => Promise.resolve() }
					var saveSpy = sinon.spy(taskModel, 'save')

					var promise = sut_saveTask(taskModel)

					promise.then((result) => {
						expect(saveSpy).to.have.been.called
						expect(result).to.equal(taskModel)
						done()
					})
				})

				it('should reject when the task model cannot be saved', (done) => {
					var somethingWentWrong = 'error'
					var taskModel = { save: () => Promise.reject(somethingWentWrong) }
					var saveSpy = sinon.spy(taskModel, 'save')

					var promise = sut_saveTask(taskModel)

					promise.catch((error) => {
						expect(saveSpy).to.have.been.called
						expect(error).to.equal(somethingWentWrong)
						done()
					})
				})
			})
		})
	})
})
