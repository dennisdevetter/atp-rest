import csvtojson from 'csvtojson'
var convertDataToJson = require('../convert-datatojson')
var sut_convertDataToJson = convertDataToJson.default

export default function tests(){
	describe('convert data to json', () => {
		it('should throw exception if the value is null', () => {
			var value = null, headers='headers'
			expect(sut_convertDataToJson.bind(convertDataToJson, value, headers)).to.throw('value cannot be null')
		})

		it('should throw exception if the headers is null and first line does not contain headers', () => {
			var value = 'value', headers=null, firstLineContainsHeader=false
			expect(sut_convertDataToJson.bind(convertDataToJson, value, headers, firstLineContainsHeader)).to.throw('headers are required if first line does not contain headers')
		})

		it('should resolve the converter json value for a csv row with headers and first line contains no header', (done) => {
			var value='csv string', headers='firstname,lastname,address', json={ firstname: 'aaa', lastname: 'bbb', address: 'ccc' }						
			var converterStub = root.sandbox.stub(csvtojson, 'Converter').returns({ fromString: (path, callback) => callback(null, json) })

			var promise = sut_convertDataToJson(value, headers)

			promise.then((result) => {
				expect(converterStub).to.have.been.calledWith({noheader: true, headers})
				expect(result).to.equal(json)
				done()
			}).catch(done)
		})

		it('should resolve the converter json value for a csv row with headers and first line contains a header', (done) => {
			var value='csv string', headers='firstname,lastname,address', json={ firstname: 'aaa', lastname: 'bbb', address: 'ccc' }						
			var converterStub = root.sandbox.stub(csvtojson, 'Converter').returns({ fromString: (path, callback) => callback(null, json) })

			var promise = sut_convertDataToJson(value, headers, true)

			promise.then((result) => {
				expect(converterStub).to.have.been.calledWith({noheader: false, headers})
				expect(result).to.equal(json)
				done()
			}).catch(done)
		})

		it('should reject if the conversion fails for the given value', (done) => {
			var value='csv string', headers='firstname,lastname,address', somethingWentWrong = 'error'				
			var converterStub = root.sandbox.stub(csvtojson, 'Converter').returns({ fromString: (path, callback) => callback(somethingWentWrong, null) })

			var promise = sut_convertDataToJson(value, headers)

			promise.catch((error) => {
				expect(converterStub).to.have.been.calledWith({noheader: true, headers})
				expect(error).to.equal(somethingWentWrong)
				done()
			}).catch(done)
		})
	})
}