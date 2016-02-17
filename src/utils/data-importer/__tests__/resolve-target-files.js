var getFileMatches = require('../get-file-matches')
var resolveTargetFiles = require('../resolve-target-files')
var sut_resolveTargetFiles = resolveTargetFiles.default

describe('utils', () => {  		
	describe('data importer', () => {
		describe('resolve target files', () => {
			it('should throw exception if the configurations is null', () => {			
				var configurations = null
				expect(sut_resolveTargetFiles.bind(resolveTargetFiles, configurations)).to.throw('configurations cannot be null')
			}) 	

			it('should resolve all file matches for the given configuration', (done) => {
				var configuration = { configOne: { path: '*.txt', schema: '...'} }
				var configurations = { configuration }
				var matches = { filePaths: ['a.txt', 'b.txt', 'c.txt'], configuration }
				var getFileMatchesStub = root.sandbox.stub(getFileMatches, 'default').returns(Promise.resolve(matches))

				var promise = sut_resolveTargetFiles(configurations)

				promise.then((result) => {
					expect(result).to.not.be.empty
					expect(result.length).to.equal(1)
					expect(result[0]).to.equal(matches)
					done()
				}).catch(done)
			})

			it('should resolve all file matches and ignore the ones that failed the file match', (done) => {
				var configurationOne = { one: { path: '*.txt', schema: '...'} }
				var configurationTwo = { two: { path: '/\\\$^wrongexpression*.txt', schema: '...'}}
				var configurationThree = { three: { path: '*.txt', schema: '...'} }
				var configurations = { configurationOne, configurationTwo, configurationThree }
				var matchesOne = { filePaths: ['a.txt', 'b.txt', 'c.txt'], configurationOne }
				var matchesThree = { filePaths: ['a.txt', 'b.txt', 'c.txt'], configurationThree }
				
				var getFileMatchesStub = root.sandbox.stub(getFileMatches, 'default')
				getFileMatchesStub.onFirstCall().returns(Promise.resolve(matchesOne))
				getFileMatchesStub.onCall(1).returns(Promise.reject())
				getFileMatchesStub.onCall(2).returns(Promise.resolve(matchesThree))

				var promise = sut_resolveTargetFiles(configurations)

				promise.then((result) => {
					expect(result).to.not.be.empty
					expect(result.length).to.equal(2)
					expect(result[0]).to.equal(matchesOne)
					expect(result[1]).to.equal(matchesThree)
					done()
				}).catch(done)
			})
		})
	})
})