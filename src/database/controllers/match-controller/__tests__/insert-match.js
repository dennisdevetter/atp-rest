import sut_insertMatch from '../insert-match'
import MatchModel from '../../../../database/models/match-model'

export default function tests() {
      describe('insert match', () => {
      	it('should not be empty', () => {                          
      		expect(sut_insertMatch).to.not.be.empty  				
       	})

      	it ('should not insert when the match is already found', (done) => {
      		var jsonMatch = createJsonMatch()

      		var matchModel = { save: sinon.spy() }
      		var matchWasFound = Promise.resolve(matchModel)          
      		var findMatch = root.sandbox.stub(MatchModel, 'findOne').returns(matchWasFound)            
      		var findQuery = { tourneyId: jsonMatch.tourneyId, match: jsonMatch.match }

      		var promise = sut_insertMatch(jsonMatch)

          promise.catch((error) => {
                expect(findMatch).to.have.been.calledWith(findQuery)      
                expect(matchModel.save).to.not.have.been.called
                expect(error).to.equal('item already exists')
                done()
          }).catch(done)      		
      	})   

      	it ('should insert when the match is not found', (done) => {

      		var matchWasNotFound = Promise.resolve(null)        
      		var findMatch = root.sandbox.stub(MatchModel, 'findOne').returns(matchWasNotFound)        
      		var matchModel = { save : () => Promise.resolve(matchModel) }
      		var createModel = root.sandbox.stub(MatchModel, 'create').returns(matchModel)      
      		var saveTheMatch = sinon.spy(matchModel, 'save')                  
      		var jsonMatch = createJsonMatch()      		
      		var findQuery = { tourneyId: jsonMatch.tourneyId, match: jsonMatch.match }

      		var promise = sut_insertMatch(jsonMatch)

      		promise.then((result) => {
      			expect(findMatch).to.have.been.calledWith(findQuery)    
      			expect(saveTheMatch).to.have.been.called       
      			expect(createModel).to.have.been.calledWith(jsonMatch)        
      			done()
      		}).catch(done)          
      	})               
      })	 
}

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
