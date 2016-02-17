import sut_saveMatch from '../save-match'

describe('database', () => {
	describe('controllers', () => {
		describe('match controller', () => {
			describe('save match', () => {
				it('should save a new match', (done) => {
					var json = {
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
					}

					sut_saveMatch(json).then((model) => {							
						expect(model._id).to.not.be.empty
						done()
					}).catch(done)					
				})
			})
		})
	})
})