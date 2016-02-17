import sut_saveMatch from '../save-match'
import MatchModel from '../../../../database/models/match-model'

describe('database', () => {
	describe('controllers', () => {
		describe('match controller', () => {
			describe('save match', () => {
				it('should not be empty', () => {                          
					expect(sut_saveMatch).to.not.be.empty  				
				})

				it ('should save when the match is not found', (done) => {

					var matchWasNotFound = Promise.resolve(null)        
					var findMatch = root.sandbox.stub(MatchModel, 'findOne').returns(matchWasNotFound)        
					var matchModel = { save : () => Promise.resolve(matchModel) }
					var createModel = root.sandbox.stub(MatchModel, 'create').returns(matchModel)      
					var saveTheMatch = sinon.spy(matchModel, 'save')                  
					var jsonMatch = createJsonMatch()               
					var findQuery = { tourneyId: jsonMatch.tourneyId, match: jsonMatch.match }

					var promise = sut_saveMatch(jsonMatch)

					promise.then((result) => {
						expect(findMatch).to.have.been.calledWith(findQuery)    
						expect(saveTheMatch).to.have.been.called       
						expect(createModel).to.have.been.calledWith(jsonMatch)        
						done()
					}).catch(done)          
				})  

				 it ('should update and save when the match is already found', (done) => {

					var existingMatchModel = {                         
						tourneyId: 1233,
						match: 100,
						tourneyLevel: 1,
						save: () => Promise.resolve(existingMatchModel) 
					}                                    
					var jsonMatch = {
						tourneyId: 1233,
						tourneyName: 'Auckland',
						tourneyLevel: 2,      
						match: 100
					}                  
					var findMatch = root.sandbox.stub(MatchModel, 'findOne').returns(Promise.resolve(existingMatchModel))                                                       
					var findQuery = { tourneyId: jsonMatch.tourneyId, match: jsonMatch.match }
					var saveTheMatch = sinon.spy(existingMatchModel, 'save')           

					var promise = sut_saveMatch(jsonMatch)

					promise.then((result) => {
						expect(findMatch).to.have.been.calledWith(findQuery)    
						expect(saveTheMatch).to.have.been.called                               
						expect(result).to.not.be.empty
						expect(result.tourneyLevel).to.equal(2)
						done()
					}).catch(done)          
				})   
			})                 
		})	 
	})     
})     


// helper methods

function createJsonMatch(){
  return {
		tourneyId: 'jsonMatch.tourney_id',
		tourneyName: 'jsonMatch.tourney_name',
		tourneyLevel: 'jsonMatch.tourney_level',      
		tourneyDate: 'jsonMatch.tourney_date',
		match: 'jsonMatch.match_num',
		surface: 'jsonMatch.surface',
		drawSize: 'jsonMatch.draw_size',
		winnerId: 'jsonMatch.winner_id',
		winnerIoc: 'jsonMatch.winner_ioc',
		loserId: 'jsonMatch.loser_id',
		loserIoc: 'jsonMatch.loser_ioc',
		score: 'jsonMatch.score',
		bestOf: 'jsonMatch.best_of',
		round: 'jsonMatch.round',
		minutes: 'jsonMatch.minutes',
		wAce: 'jsonMatch.w_ace',
		wDf: 'jsonMatch.w_df',
		wSvpt: 'jsonMatch.w_svpt',
		w1stIn: 'jsonMatch.w_1stIn',
		w1stWon: 'jsonMatch.w_1stWon',
		w2ndWon: 'jsonMatch.w_2ndWon',
		wSvGms: 'jsonMatch.w_SvGms',
		wBpSaved: 'jsonMatch.w_bpSaved',
		wBpFaced: 'jsonMatch.w_bpFaced',
		lAce: 'jsonMatch.l_ace',
		lDf: 'jsonMatch.l_df',
		lSvpt: 'jsonMatch.l_svpt',
		l1stIn: 'jsonMatch.l_1stIn',
		l1stWon: 'jsonMatch.l_1stWon',
		l2ndWon: 'jsonMatch.l_2ndWon',
		lSvGms: 'jsonMatch.l_SvGms',
		lBpSaved: 'jsonMatch.l_bpSaved',
		lBpFaced: 'jsonMatch.l_bpFaced'
   }
}
