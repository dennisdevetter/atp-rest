var saveToDatabase = require('../save-to-database')
var sut_saveToDatabase = saveToDatabase.default

describe('utils', () => {  		
	describe('data importer', () => {
		describe('save to database', () => {
			it('should throw exception if saveItem is null', () => {			
				var options = { saveItem: null}
				expect(sut_saveToDatabase.bind(saveToDatabase, options)).to.throw('saveItem cannot be null')
			}) 	

			it('should try to save all the items and resolve the succeeded and failed count', (done) => {
				var items = [1, 2, 3, 4], saveItemStub = sinon.stub()
				saveItemStub.withArgs(items[0]).returns(Promise.resolve())
				saveItemStub.withArgs(items[1]).returns(Promise.reject('error'))
				saveItemStub.withArgs(items[2]).returns(Promise.reject('error'))
				saveItemStub.withArgs(items[3]).returns(Promise.resolve())
				
				var promise = sut_saveToDatabase(items, { saveItem: saveItemStub})

				promise.then((result) => {
					expect(result).to.not.be.empty
					expect(result.succeeded).to.equal(2)
					expect(result.failed).to.equal(2)
					done()

				}).catch(done)
			})

			it('should reject if something goes wrong', (done) => {
				var items = 'not an array', saveItemStub = sinon.stub().returns(Promise.resolve())

				var promise = sut_saveToDatabase(items, { saveItem: saveItemStub})

				promise.catch((error) => {
					expect(error).to.be.ok
					done()
				}).catch(done)
			})
		})
	})
})