var handleAllTargetFiles = require('../handle-all-target-files')
var getStatusMessage = require('../status-message')
var logger = require('../../../utils/logger').default
var taskRunner = require('../../task-runner').default

var startImport = require('../start-import')
var sut_startImport = startImport.default

describe('utils', () => {  		
	describe('data importer', () => {
		describe('start import', () => {
			it('return immediatly if the target files are null', () => {			
				sut_startImport(null)
			}) 	

			it('should start the import and log a message when done', (done) => {
				var targetFiles = ['aa','bb'], task = () => {}, now = Date.now(), taskModel = { status: 2, lastExecutedOn: now}			
				var statusMessage = 'the status message', dateString = new Date(now)
				var taskPromise = Promise.resolve(taskModel)

				var handleAllTargetFilesStub = root.sandbox.stub(handleAllTargetFiles, 'default').returns(task)
				var startTaskStub = root.sandbox.stub(taskRunner, 'startTask').returns(taskPromise)
				var getStatusMessageStub = root.sandbox.stub(getStatusMessage, 'default').returns(statusMessage)
				var loggerStub = root.sandbox.stub(logger, 'log')

				sut_startImport(targetFiles)

				taskPromise.then((result) => {
					expect(handleAllTargetFilesStub).to.have.been.calledWith(targetFiles)
					expect(startTaskStub).to.have.been.calledWith({ taskId: 'importfiles', task })
					expect(getStatusMessageStub).to.have.been.calledWith(taskModel.status)
					expect(loggerStub).to.have.been.calledWith(`task was executed on ${dateString} with status: ${statusMessage}`)				
					done()
				}).catch(done)
			})
		})
	})
})
