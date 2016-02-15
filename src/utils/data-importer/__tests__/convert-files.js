var csvConverter = require('../../../utils/csv-converter')
var convertFiles = require('../convert-files')
var sut_convertFiles = convertFiles.default

export default function tests(){
	describe('convert files', () => {
		it('should throw exception if the configuration does not have a schema', () => {
			var filePath = null, schema = 'the schema', configuration = { schema }

			expect(sut_convertFiles.bind(convertFiles, filePath, configuration)).to.throw('filePath cannot be null')
		})

		it('should throw exception if the file path is null', () => {
			var filePath = 'file path', schema = null, configuration = { schema}

			expect(sut_convertFiles.bind(convertFiles, filePath, configuration)).to.throw('schema cannot be null')
		})

		it('should convert the files for a valid filepath and configuration', (done) => {
			var filePath = 'filepath', schema = 'the schema', firstLineContainsHeader = true
			var configuration = { schema, firstLineContainsHeader }, items = ['aa','bb']
			var convertCsvToJsonStub = root.sandbox.stub(csvConverter, 'default').returns(Promise.resolve(items))

			var promise = sut_convertFiles(filePath, configuration)

			promise.then((result) => {
				expect(convertCsvToJsonStub).to.have.been.calledWith(filePath, schema, firstLineContainsHeader)
				expect(result).to.equal(items)
				done()
			}).catch(done)
		})

		it('should reject if the conversion fails', (done) => {
			var filePath = 'filepath', schema = 'the schema', firstLineContainsHeader = true
			var configuration = { schema, firstLineContainsHeader }, somethingWentWrong = 'some error'
			var convertCsvToJsonStub = root.sandbox.stub(csvConverter, 'default').returns(Promise.reject(somethingWentWrong))

			var promise = sut_convertFiles(filePath, configuration)

			promise.catch((result) => {
				expect(convertCsvToJsonStub).to.have.been.calledWith(filePath, schema, firstLineContainsHeader)
				expect(result).to.equal(somethingWentWrong)
				done()
			})
		})
	})

}