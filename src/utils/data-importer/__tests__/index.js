import sut_dataImporter from '../index'

describe('utils', () => {  		
	describe('data importer', () => {

		it('should not be empty', () => {
			expect(sut_dataImporter).to.not.be.empty
		})

		it('should start the import', (done) => {
			var resolveTargetFiles = require('../resolve-target-files')
			var startImport  = require('../start-import')
			var promise = Promise.resolve()
			var resolveTargetFilesStub = root.sandbox.stub(resolveTargetFiles, 'default').returns(promise)
			var startImportStub = root.sandbox.stub(startImport, 'default').returns(() => {})

			var configuration = {}
			sut_dataImporter(configuration)

			promise.then(() => {
				expect(resolveTargetFilesStub).to.have.been.calledWith(configuration)	
				expect(startImportStub).to.have.been.called
				done()
			}).catch(done)
		})		
	})
})