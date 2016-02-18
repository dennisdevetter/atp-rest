import sut_queryMatch from '../query-match'
import saveMatch from '../save-match'

describe('database', () => {
	describe('controllers', () => {
		describe('match controller', () => {

			before((done) => {
					root.testStore.dropDatabase()
						.then(insertDummyData)
						.then(() => done())
						.catch(done)						
			})

			describe('query match', () => {						
				it('should get multiple matches by filter', (done) => {					
					var filter = { match: 100 }					
					var promise = sut_queryMatch(filter)

					promise.then((result) => {														
						expect(result).to.be.ok														
						expect(result.length).to.equal(10)
						done()
					}).catch(done)	
				})	

				it('should get no matches with filter', (done) => {					
					var filter = { match: 99999 }					
					var promise = sut_queryMatch(filter)

					promise.then((result) => {																				
						expect(result).to.be.ok					
						expect(result.length).to.equal(0)
						done()
					}).catch(done)	
				})			
			})
		})
	})
})

function insertDummyData() {
	var count = 10, matches = []
	for (var i = 0; i < count; i++) {
		matches.push(createJsonMatch({tourneyId: 'foo' + (i+1), match:100 }))
	}

	var lastPromise = matches.reduce((promise, jsonMatch) => {					
		return promise.then(() => saveMatch(jsonMatch))
	}, Promise.resolve())

	return lastPromise
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