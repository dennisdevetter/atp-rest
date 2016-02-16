import sut_dataImporter from '../index'

export default function tests() {
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

		require('./convert-files').default()		
		require('./do-import').default()
		require('./get-file-matches').default()
		require('./handle-all-target-files').default()
		require('./handle-target-file').default()
		require('./pre-import-check').default()
		require('./resolve-target-files').default()
		require('./save-to-database').default()
		require('./start-import').default()
		require('./status-message').default()
	})
}