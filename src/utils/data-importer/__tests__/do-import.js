var checkIfImportNeeded = require('../pre-import-check')
var convertFilesToJson = require('../convert-files')
var saveToDatabase = require('../save-to-database')
var doImport = require('../do-import')
var sut_doImport = doImport.default

export default function tests(){
	describe('do import', () => {
		it('should throw an exception if the filePath is null', () => {
			var filePath = null

			expect(sut_doImport.bind(doImport,filePath)).to.throw('filePath cannot be null')
		})

		it('should throw an exception if the configuration is null', () => {
			var filePath = 'file path',  configuration = null

			expect(sut_doImport.bind(doImport, filePath, configuration)).to.throw('configuration cannot be null')	
		})

		it('should throw an exception if the configuration on save handler is null', () => {
			var filePath = 'file path',  configuration = { onSave: null }, taskInfo = 'task info'

			expect(sut_doImport.bind(doImport, filePath, configuration, taskInfo)).to.throw('onSave cannot be null')	
		})

		it('should throw an exception if the task info is null', () => {
			var filePath = 'file path', configuration = 'configuration', taskInfo = null

			expect(sut_doImport.bind(doImport, filePath, configuration, taskInfo)).to.throw('taskInfo cannot be null')		
		})

		it('should resolve immediatly if the import is not needed', (done) => {			
			var filePath = 'file path', configuration = { onSave: () => {} }, taskInfo = 'task info'
			var checkResult = { shouldImport: false }
			var checkIfImportNeededStub = root.sandbox.stub(checkIfImportNeeded, 'default').returns(Promise.resolve(checkResult))

			var promise = sut_doImport(filePath, configuration, taskInfo)

			promise.then(() => {
				expect(checkIfImportNeededStub).to.have.been.calledWith(filePath, taskInfo)
				done()
			}).catch(done)
		})

		it('should import the files and resolve if finished', (done) => {
			var filePath = 'file path', saveHandler = () => {}, configuration = { onSave: saveHandler }, taskInfo = 'task info'
			var checkResult = { shouldImport: true }, jsonResult = { json: 'bbb' }
			var checkIfImportNeededStub = root.sandbox.stub(checkIfImportNeeded, 'default').returns(Promise.resolve(checkResult))
			var convertFilesToJsonStub = root.sandbox.stub(convertFilesToJson, 'default').returns(Promise.resolve(jsonResult))
			var saveToDatabaseStub = root.sandbox.stub(saveToDatabase, 'default').returns(Promise.resolve())

			var promise = sut_doImport(filePath, configuration, taskInfo)

			promise.then(() => {
				expect(checkIfImportNeededStub).to.have.been.calledWith(filePath, taskInfo)
				expect(convertFilesToJsonStub).to.have.been.calledWith(filePath, configuration)
				expect(saveToDatabaseStub).to.have.been.calledWith(jsonResult, { saveItem: saveHandler })
				done()
			}).catch(done)
		})

		it('should reject if an error occurs during the import check', (done) => {
			var filePath = 'file path', saveHandler = () => {}, configuration = { onSave: saveHandler }, taskInfo = 'task info'
			var somethingWentWrong = 'error'
			var checkIfImportNeededStub = root.sandbox.stub(checkIfImportNeeded, 'default').returns(Promise.reject(somethingWentWrong))

			var promise = sut_doImport(filePath, configuration, taskInfo)

			promise.catch((error) => {
				expect(checkIfImportNeededStub).to.have.been.calledWith(filePath, taskInfo)
				expect(error).to.equal(somethingWentWrong)				
				done()
			}).catch(done)
		})

		it('should reject if the conversion of files while importing throws an error', (done) => {
			var filePath = 'file path', saveHandler = () => {}, configuration = { onSave: saveHandler }, taskInfo = 'task info'
			var checkResult = { shouldImport: true }, somethingWentWrong = 'error'
			var checkIfImportNeededStub = root.sandbox.stub(checkIfImportNeeded, 'default').returns(Promise.resolve(checkResult))
			var convertFilesToJsonStub = root.sandbox.stub(convertFilesToJson, 'default').returns(Promise.reject(somethingWentWrong))

			var promise = sut_doImport(filePath, configuration, taskInfo)

			promise.catch((error) => {
				expect(checkIfImportNeededStub).to.have.been.calledWith(filePath, taskInfo)
				expect(convertFilesToJsonStub).to.have.been.calledWith(filePath, configuration)
				expect(error).to.equal(somethingWentWrong)				
				done()
			}).catch(done)
		})		

		it('should reject if saving to database throws an error', (done) => {
			var filePath = 'file path', saveHandler = () => {}, configuration = { onSave: saveHandler }, taskInfo = 'task info'			
			var checkResult = { shouldImport: true }, jsonResult = { json: 'bbb' }, somethingWentWrong = 'error'
			var checkIfImportNeededStub = root.sandbox.stub(checkIfImportNeeded, 'default').returns(Promise.resolve(checkResult))
			var convertFilesToJsonStub = root.sandbox.stub(convertFilesToJson, 'default').returns(Promise.resolve(jsonResult))
			var saveToDatabaseStub = root.sandbox.stub(saveToDatabase, 'default').returns(Promise.reject(somethingWentWrong))

			var promise = sut_doImport(filePath, configuration, taskInfo)

			promise.catch((error) => {
				expect(checkIfImportNeededStub).to.have.been.calledWith(filePath, taskInfo)
				expect(convertFilesToJsonStub).to.have.been.calledWith(filePath, configuration)
				expect(saveToDatabaseStub).to.have.been.calledWith(jsonResult, { saveItem: saveHandler })
				expect(error).to.equal(somethingWentWrong)				
				done()
			}).catch(done)
		})		
	})
}