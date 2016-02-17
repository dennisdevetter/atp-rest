var handleTargetFile = require('../handle-target-file')
var handleAllTargetFiles = require('../handle-all-target-files')
var sut_handleAllTargetFiles = handleAllTargetFiles.default

describe('utils', () => {  		
	describe('data importer', () => {
		describe('handle all target files', () => {
			it('should throw exception if the path is null', () => {
				var targetFiles = null
				expect(sut_handleAllTargetFiles.bind(handleAllTargetFiles, targetFiles)).to.throw('targetFiles cannot be null')
			})

			it('should resolve all the handled target file promises', (done) => {			
				var taskInfo = 'task info'
				var targetFiles = ['file1', 'file2', 'file3']
				var handleTargetFileStub = root.sandbox.stub(handleTargetFile, 'default').returns(Promise.resolve())

				var lastPromise = sut_handleAllTargetFiles(targetFiles)(taskInfo)

				lastPromise.then(() => {
					expect(handleTargetFileStub).to.have.been.calledWith('file1', taskInfo)
					expect(handleTargetFileStub).to.have.been.calledWith('file2', taskInfo)
					expect(handleTargetFileStub).to.have.been.calledWith('file3', taskInfo)
					done()
				}).catch(done)
			})	

			it('should reject if a target file promise fails', (done) => {			
				var taskInfo = 'task info'
				var targetFiles = ['file1','file2']
				var somethingWentWrong = 'error'
				var handleTargetFileStub = root.sandbox.stub(handleTargetFile, 'default').returns(Promise.reject(somethingWentWrong))

				var lastPromise = sut_handleAllTargetFiles(targetFiles)(taskInfo)

				lastPromise.catch((error) => {
					expect(handleTargetFileStub).to.have.been.calledWith('file1', taskInfo)
					expect(handleTargetFileStub).to.not.have.been.calledWith('file2', taskInfo)
					expect(error).to.equal(somethingWentWrong)				
					done()
				}).catch(done)
			})	
		})
	})
})