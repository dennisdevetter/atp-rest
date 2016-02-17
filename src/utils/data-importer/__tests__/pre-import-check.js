var preImportCheck = require('../pre-import-check')
var sut_preImportCheck = preImportCheck.default
var fs = require('fs')

describe('utils', () => {  		
	describe('data importer', () => {
		describe('pre import check', () => {
			it('should throw exception if the filePath is null', () => {			
				var filePath = null
				expect(sut_preImportCheck.bind(preImportCheck, filePath)).to.throw('filePath cannot be null')
			})
	 		
			it('should resolve true if the force import argument is set', (done) => {			
				var filePath = 'file1'
				process.argv.push('force')

				var promise = sut_preImportCheck(filePath)

				promise.then((result) => {				
					expect(result).to.deep.equal({shouldImport: true})
					finish()
				}).catch(finish)

				function finish() {
					process.argv.pop('force')
					done()
				}
			})

			it('should resolve true if the last task run was unsuccesfull', (done) => {			
				var filePath = 'file1'
				var taskInfo = { lastExecutedOn: 111, status: 2 }

				var promise = sut_preImportCheck(filePath, taskInfo)

				promise.then((result) => {				
					expect(result).to.deep.equal({shouldImport: true})
					done()
				}).catch(done)
			})

			it('should resolve true if the file was modified after the last task run', (done) => {			
				var filePath = 'file1'
				var taskInfo = { lastExecutedOn: 111, status: 1 }
				var fileStatStub = root.sandbox.stub(fs, 'stat', (path, callback) => callback(null, { mtime: 999}))

				var promise = sut_preImportCheck(filePath, taskInfo)

				promise.then((result) => {				
					expect(result).to.deep.equal({shouldImport: true})
					done()
				}).catch(done)
			})

			it('should resolve false if the task info is null', (done) => {			
				var filePath = 'file1', taskInfo = null

				var promise = sut_preImportCheck(filePath, taskInfo)

				promise.then((result) => {				
					expect(result).to.deep.equal({shouldImport: false})
					done()
				}).catch(done)			
			})

			it('should reject if something went wrong reading the stats of the file', (done) => {			
				var filePath = 'file1'
				var taskInfo = { lastExecutedOn: 111, status: 1 }
				var sometingWentWrong = 'some error'
				var fileStatStub = root.sandbox.stub(fs, 'stat', (path, callback) => callback(sometingWentWrong, null))

				var promise = sut_preImportCheck(filePath, taskInfo)

				promise.catch((result) => {								
					expect(result).to.equal(sometingWentWrong)
					done()
				}).catch(done)
			})
		})
	})
})