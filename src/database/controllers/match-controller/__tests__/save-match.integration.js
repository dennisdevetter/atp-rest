import sut_saveMatch from '../save-match'

describe('database', () => {
	describe('controllers', () => {
		describe('match controller', () => {

			var existingMatchId

			before((done) => {
					root.testStore.dropDatabase()
						.then(insertDummyData().then((result) => existingMatchId = result.id ))
						.then(() => done())
						.catch(done)						
			})

			describe('save match', () => {						
				it('should save an existing match when the json does not contain the id', (done) => {
					var jsonMatch = createJsonMatch({tourneyId: 'foo', match: 100, tourneyName: 'update 1' })					

					var promise = sut_saveMatch(jsonMatch)

					promise.then((result) => {														
						expect(result).to.not.be.empty
						expect(result.id).to.deep.equal(existingMatchId)
						expect(result.tourneyName).to.equal('update 1')						
						done()
					}).catch(done)					
				})			

				it('should save an existing match when the json contains the id', (done) => {
					var jsonMatch = createJsonMatch({id: existingMatchId, tourneyName: 'update 2' })					
					
					var promise = sut_saveMatch(jsonMatch)

					promise.then((result) => {																							
						expect(result).to.not.be.empty
						expect(result.id).to.deep.equal(existingMatchId)
						expect(result.tourneyName).to.equal('update 2')							
						done()
					}).catch(done)		
				})

				it('should not save when the json contains invalid data for property \'match\'', (done) => {
					var jsonMatch = createJsonMatch({match: 'string is invalid for match' })					

					var promise = sut_saveMatch(jsonMatch)

					promise.catch((error) => {							
						expect(error).to.not.be.empty
						expect(error.name).to.equal('CastError')
						expect(error.kind).to.equal('number')						
						done()
					}).catch(done)		
				})

				it('should save a new match', (done) => {
					var jsonMatch = createJsonMatch({tourneyId: 'bar', match: 123, tourneyName: 'foobar' })					
					
					var promise = sut_saveMatch(jsonMatch)

					promise.then((result) => {																											
						expect(result).to.not.be.empty
						expect(result.id).to.not.be.empty
						expect(result.tourneyId).to.equal('bar')						
						expect(result.match).to.equal(123)			
						expect(result.tourneyName).to.equal('foobar')						
						done()
					}).catch(done)			
				})

			})
		})
	})
})

function insertDummyData() {
	var jsonMatch = createJsonMatch()
	return sut_saveMatch(jsonMatch)
}

function createJsonMatch(data = {}){
	var json = Object.assign({
 		 tourneyId: 'foo',						 		 
		 tourneyName: 'foo',
	 	 tourneyLevel: 'foo',   
	 	 tourneyId: 'foo',
     tourneyName: 'foo',
     tourneyLevel: 'foo',      
     tourneyDate: 100,
     match: 100,
     surface: 'foo',
     drawSize: 100,
     winnerId: 100,
     winnerIoc: 'foo',
     loserId: 100,
     loserIoc: 'foo'  
		}, data)

		return json
}