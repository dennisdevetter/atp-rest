import fs from 'fs'
var convertDataToJson = require('../convert-datatojson')
var converter = require('../converter')
var sut_converter = converter.default

describe('utils', () => {  	
	describe('csv converter', () => {
		describe('converter', () => {
			it('should throw exception if the value is null', () => {
				var filePath = null, headers='headers'
				expect(sut_converter.bind(converter, filePath, headers)).to.throw('filePath cannot be null')
			})

			it('should resolve the contents of the file as json', (done) => {
				var filePath = 'file.txt', headers='first_name', fileContent='john', json={ first_name:'john' }
				var readFileStub = root.sandbox.stub(fs, 'readFile', (path, options, callback) => callback(null, fileContent))			
				var convertDataToJsonStub = root.sandbox.stub(convertDataToJson, 'default').returns(Promise.resolve(json))

				var promise = sut_converter(filePath, headers)

				promise.then((result) => {
					expect(readFileStub).to.have.been.calledWith(filePath, {encoding: 'utf-8'})
					expect(convertDataToJsonStub).to.have.been.calledWith(fileContent, headers)
					expect(result).to.equal(json)
					done()
				}).catch(done)
			})

			it('should reject if reading the contents of the file fails', (done) => {
				var filePath = 'file.txt', headers='first_name', somethingWentWrong='error'
				var readFileStub = root.sandbox.stub(fs, 'readFile', (path, options, callback) => callback(somethingWentWrong, null))		

				var promise = sut_converter(filePath, headers)

				promise.catch((error) => {
					expect(readFileStub).to.have.been.calledWith(filePath, {encoding: 'utf-8'})
					expect(error).to.equal(somethingWentWrong)
					done()
				}).catch(done)
			})

			it('should reject if converting the file content to json fails', (done) => {
				var filePath = 'file.txt', headers='first_name', fileContent='john', somethingWentWrong='error'
				var readFileStub = root.sandbox.stub(fs, 'readFile', (path, options, callback) => callback(null, fileContent))	
				var convertDataToJsonStub = root.sandbox.stub(convertDataToJson, 'default').returns(Promise.reject(somethingWentWrong))	

				var promise = sut_converter(filePath, headers)

				promise.catch((error) => {
					expect(readFileStub).to.have.been.calledWith(filePath, {encoding: 'utf-8'})
					expect(convertDataToJsonStub).to.have.been.calledWith(fileContent, headers)
					expect(error).to.equal(somethingWentWrong)
					done()
				}).catch(done)
			})	
		})
	})
})