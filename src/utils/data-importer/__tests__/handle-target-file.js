var doImport = require('../do-import')
var handleTargetFile = require('../handle-target-file')
var sut_handleTargetFile = handleTargetFile.default

export default function tests() {
	describe('handle target file', () => {
		it('should throw exception if the filePaths is null', () => {
			var taskInfo = 'task info', filePaths = null , configuration = 'import configuration'						
			var targetFile = { filePaths, configuration }
			expect(sut_handleTargetFile.bind(handleTargetFile, targetFile, taskInfo)).to.throw('filePaths cannot be null')
		})

		it('should throw exception if the configuration is null', () => {
			var taskInfo = 'task info', filePaths = ['file1', 'file2', 'file3'] , configuration = null
			var targetFile = { filePaths, configuration }
			expect(sut_handleTargetFile.bind(handleTargetFile, targetFile, taskInfo)).to.throw('configuration cannot be null')
		})

		it('should throw exception if the task info is null', () => {
			var taskInfo = null, filePaths = ['file1', 'file2', 'file3'] , configuration = 'import configuration'
			var targetFile = { filePaths, configuration }
			expect(sut_handleTargetFile.bind(handleTargetFile, targetFile, taskInfo)).to.throw('taskInfo cannot be null')
		})

		it('should resolve all the handled target file promises', (done) => {			
			var taskInfo = 'task info', filePaths = ['file1', 'file2', 'file3'], configuration = 'import configuration'						
			var targetFile = { filePaths, configuration }
			var doImportStub = root.sandbox.stub(doImport, 'default').returns(Promise.resolve())

			var lastPromise = sut_handleTargetFile(targetFile, taskInfo)

			lastPromise.then(() => {				 
				expect(doImportStub).to.have.been.calledWith('file1', configuration, taskInfo)
				expect(doImportStub).to.have.been.calledWith('file2', configuration, taskInfo)
				expect(doImportStub).to.have.been.calledWith('file3', configuration, taskInfo)
				done()
			}).catch(done)
		})	

		it('should reject if a target file promise fails', (done) => {		
			var taskInfo = 'task info', filePaths = ['file1', 'file2', 'file3'], configuration = 'import configuration'						
			var targetFile = { filePaths, configuration }, somethingWentWrong = 'error'
			var doImportStub = root.sandbox.stub(doImport, 'default').returns(Promise.reject(somethingWentWrong))

			var lastPromise = sut_handleTargetFile(targetFile, taskInfo)

			lastPromise.catch((error) => {
				expect(doImportStub).to.have.been.calledWith('file1', configuration, taskInfo)
				expect(doImportStub).to.not.have.been.calledWith('file2', configuration, taskInfo)
				expect(doImportStub).to.not.have.been.calledWith('file3', configuration, taskInfo)
				expect(error).to.equal(somethingWentWrong)				
				done()
			}).catch(done)
		})	

	})
}