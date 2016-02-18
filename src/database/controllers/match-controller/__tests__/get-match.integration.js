import sut_getMatch from '../get-match'
import saveMatch from '../save-match'

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

			describe('get match', () => {						
				it('should get an existing match by filter', (done) => {					
					var jsonMatch = createJsonMatch({tourneyId: 'foo', match: 100 })					

					var promise = sut_getMatch(jsonMatch)

					promise.then((result) => {														
						expect(result).to.not.be.empty						
						expect(result.id).to.deep.equal(existingMatchId)
						done()
					}).catch(done)	
				})			

				it('should get an existing match by id', (done) => {
					var jsonMatch = createJsonMatch({ id: existingMatchId })					

					var promise = sut_getMatch(jsonMatch)

					promise.then((result) => {														
						expect(result).to.not.be.empty						
						expect(result.id).to.deep.equal(existingMatchId)
						done()
					}).catch(done)						
				})	

				it('should resolve null if the match was not found', (done) => {
					var jsonMatch = createJsonMatch({tourneyId: 'blablah', match: 100 })					

					var promise = sut_getMatch(jsonMatch)

					promise.then((result) => {																														
						expect(result).not.to.be.ok												
						done()
					}).catch(done)			
				})	

				it('should reject if the query was invalid', (done) => {
					var jsonMatch = createJsonMatch({tourneyId: 'blablah', match: 'invalid match' })					

					var promise = sut_getMatch(jsonMatch)

					promise.catch((error) => {																																					
						expect(error).to.not.be.empty
						expect(error.name).to.equal('CastError')
						done()
					}).catch(done)			
				})	
	
			})
		})
	})
})

function insertDummyData() {
	var jsonMatch = createJsonMatch()
	return saveMatch(jsonMatch)
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