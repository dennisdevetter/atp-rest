var fileHelper = require('../../../utils/file-helper').default
var config = require('../../../config')
var getFileMatches = require('../get-file-matches')
var sut_getFileMatches = getFileMatches.default

describe('utils', () => {  		
	describe('data importer', () => {
		describe('get file matches', () => {
			it('should throw exception if the path is null', () => {
				var configuration = { path: null }
				expect(sut_getFileMatches.bind(getFileMatches, configuration)).to.throw('path cannot be null')
			})

			it('should resolve all the matching files sorted descending', (done) => {
				var configurationMock = { importer: { sourcePath: 'C:\\temp\\sourcePath\\' }}, path= 'file\\d{1}.txt', configuration = { path}					
				var files = ['file1.txt', 'file2.txt', 'wrong_match.png']
				var configurationStub = root.sandbox.stub(config, 'getConfiguration').returns(configurationMock)
				var fileHelperStub = root.sandbox.stub(fileHelper, 'getContentsOfFolder').returns(Promise.resolve(files))

				var promise = sut_getFileMatches(configuration)

				promise.then((result) => {				
					expect(fileHelperStub).to.have.been.calledWith(configurationMock.importer.sourcePath)
					expect(result).to.not.be.empty
					expect(result.configuration).to.equal(configuration)
					expect(result.filePaths).to.not.be.empty
					expect(result.filePaths.length).to.equal(2)
					expect(result.filePaths[0]).to.equal('C:\\temp\\sourcePath\\file2.txt')
					expect(result.filePaths[1]).to.equal('C:\\temp\\sourcePath\\file1.txt')
					expect(result.filePaths).to.not.contain('C:\\temp\\sourcePath\\wrong_match.png')				
					done()
				}).catch(done)
			})

			it('should reject if the file helper throws an exception', (done) => {
				var configurationMock = { importer: { sourcePath: 'C:\\temp\\sourcePath\\' }}, path= 'file\\d{1}.txt', configuration = { path}					
				var somethingWentWrong = 'error'
				var configurationStub = root.sandbox.stub(config, 'getConfiguration').returns(configurationMock)
				var fileHelperStub = root.sandbox.stub(fileHelper, 'getContentsOfFolder').returns(Promise.reject(somethingWentWrong))

				var promise = sut_getFileMatches(configuration)

				promise.catch((error) => {				
					expect(fileHelperStub).to.have.been.calledWith(configurationMock.importer.sourcePath)
					expect(error).to.equal(somethingWentWrong)				
					done()
				})
			})

			it('should reject if getting the configuration throws an exception', (done) => {
				var configurationMock = { importer: { sourcePath: 'C:\\temp\\sourcePath\\' }}, path= 'file\\d{1}.txt', configuration = { path}					
				var somethingWentWrong = new Error(somethingWentWrong)
				var configurationStub = root.sandbox.stub(config, 'getConfiguration').throws(somethingWentWrong)

				var promise = sut_getFileMatches(configuration)

				promise.catch((error) => {				
					expect(error).to.equal(somethingWentWrong)				
					done()
				})
			})
		})
	})
})


