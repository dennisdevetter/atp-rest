import sut_saveMatch from '../save-match'
import MatchModel from '../../../../database/models/match-model'

export default function tests() {
      describe('save match', () => {
      	it('should not be empty', () => {                          
      		expect(sut_saveMatch).to.not.be.empty  				
       	})

      	it ('should not save when the match is already found', () => {

      		var jsonMatch = createJsonMatch()

      		var matchModel = { save: sinon.spy() }
      		var matchWasFound = Promise.resolve(matchModel)          
      		var findMatch = root.sandbox.stub(MatchModel, 'findOne').returns(matchWasFound)            
      		var findQuery = { tourneyId: jsonMatch.tourney_id, match: jsonMatch.match_num }

      		sut_saveMatch(jsonMatch)

      		expect(findMatch).to.have.been.calledWith(findQuery)      
      		expect(matchModel.save).to.not.have.been.called
      	})   

      	it ('should save when the match is not found', (done) => {

      		var matchWasNotFound = Promise.resolve(null)        
      		var findMatch = root.sandbox.stub(MatchModel, 'findOne').returns(matchWasNotFound)        
      		var matchModel = { save : () => Promise.resolve() }
      		var createModel = sinon.stub(MatchModel, 'create').returns(matchModel)      
      		var saveTheMatch = sinon.spy(matchModel, 'save')                  
      		var jsonMatch = createJsonMatch()
      		var newMatchModel = createMatchModel(jsonMatch)
      		var findQuery = { tourneyId: jsonMatch.tourney_id, match: jsonMatch.match_num }

      		sut_saveMatch(jsonMatch)
      		
      		matchModel.save().then(() => {
      			expect(findMatch).to.have.been.calledWith(findQuery)    
      			expect(saveTheMatch).to.have.been.called       
      			expect(createModel).to.have.been.calledWith(newMatchModel)        
      			done()
      		}).catch(done)          
      	})   
      })	 
}


// helper methods
function createJsonMatch() {

   var json = { 
      tourney_id : 'tourney_id',
      tourney_name : 'tourney_name',
      tourney_level : 'tourney_level',
      tourney_date : 'tourney_date',
      match_num : 'match_num',
      surface : 'surface',
      draw_size : 'draw_size',
      winner_id : 'winner_id',
      winner_ioc : 'winner_ioc',
      loser_id : 'loser_id',
      loser_ioc : 'loser_ioc',
      score : 'score',
      best_of : 'best_of',
      round : 'round',
      minutes : 'minutes',
      w_ace : 'w_ace',
      w_df : 'w_df',
      w_svpt : 'w_svpt',
      w_1stIn : 'w_1stIn',
      w_1stWon : 'w_1stWon',
      w_2ndWon : 'w_2ndWon',
      w_SvGms : 'w_SvGms',
      w_bpSaved : 'w_bpSaved',
      w_bpFaced : 'w_bpFaced',
      l_ace : 'l_ace',
      l_df : 'l_df',
      l_svpt : 'l_svpt',
      l_1stIn : 'l_1stIn',
      l_1stWon : 'l_1stWon',
      l_2ndWon : 'l_2ndWon',
      l_SvGms : 'l_SvGms',
      l_bpSaved : 'l_bpSaved',
      l_bpFaced : 'l_bpFaced'
    }
     
    return json
}

function createMatchModel(jsonMatch){
  return {
      tourneyId: jsonMatch.tourney_id,
      tourneyName: jsonMatch.tourney_name,
      tourneyLevel: jsonMatch.tourney_level,      
      tourneyDate: jsonMatch.tourney_date,
      match: jsonMatch.match_num,
      surface: jsonMatch.surface,
      drawSize: jsonMatch.draw_size,
      winnerId: jsonMatch.winner_id,
      winnerIoc: jsonMatch.winner_ioc,
      loserId: jsonMatch.loser_id,
      loserIoc: jsonMatch.loser_ioc,
      score: jsonMatch.score,
      bestOf: jsonMatch.best_of,
      round: jsonMatch.round,
      minutes: jsonMatch.minutes,
      wAce: jsonMatch.w_ace,
      wDf: jsonMatch.w_df,
      wSvpt: jsonMatch.w_svpt,
      w1stIn: jsonMatch.w_1stIn,
      w1stWon: jsonMatch.w_1stWon,
      w2ndWon: jsonMatch.w_2ndWon,
      wSvGms: jsonMatch.w_SvGms,
      wBpSaved: jsonMatch.w_bpSaved,
      wBpFaced: jsonMatch.w_bpFaced,
      lAce: jsonMatch.l_ace,
      lDf: jsonMatch.l_df,
      lSvpt: jsonMatch.l_svpt,
      l1stIn: jsonMatch.l_1stIn,
      l1stWon: jsonMatch.l_1stWon,
      l2ndWon: jsonMatch.l_2ndWon,
      lSvGms: jsonMatch.l_SvGms,
      lBpSaved: jsonMatch.l_bpSaved,
      lBpFaced: jsonMatch.l_bpFaced
    }
}
