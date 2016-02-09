import PlayerModel from '../../../database/models/player-model'
import sut_saveRankings from '../save-rankings'
import Promise from 'bluebird'

const expectedSchema = [
	'ranking_date', 
	'ranking', 
	'player_id', 
	'ranking_points', 
	'tours'	
]

describe('save rankings', () => {
  	it ('should not save when the player cannot be found', () => {

      // arrange
      var cannotFindThePlayer = new Promise((resolve, reject) => resolve(null))      
      var findPlayerStub = root.sandbox.stub(PlayerModel, 'findOne').returns(cannotFindThePlayer)      
      var json = { player_id  : '123456' }

      //act
      sut_saveRankings(json)

      //assert
      expect(findPlayerStub).to.have.been.calledWith({ playerId: json.player_id })      
  	})    

    it ('should not save when the ranking was already saved', () => {

      // arrange
      var playerModel = { playerId: '123456', ranking: [ { date: 'some ranking' }] }
      var findPlayer = new Promise((resolve, reject) => resolve(playerModel))      
      var findPlayerStub = root.sandbox.stub(PlayerModel, 'findOne').returns(findPlayer)
      var json = { player_id  : '123456', ranking_date: 'some ranking' }

      //act
      sut_saveRankings(json)

      //assert
      expect(findPlayerStub).to.have.been.calledWith({ playerId: json.player_id })
    })    

    it ('should save when the ranking was not found for the player', (done) => {

      // arrange      
      var playerModel = {
       playerId: '123456', 
       firstName: 'john',
       lastName: 'Do',
       ranking: [],        
       save : () => new Promise((resolve, reject) => {
          expect(saveSpy).to.have.been.called          
          done()
       })
      }

      var json = { 
        player_id  : '123456', 
        ranking_date: 'some ranking',
        ranking_points: '100' 
      }

      var findPlayer = new Promise((resolve, reject) => resolve(playerModel))            
      var findPlayerStub = root.sandbox.stub(PlayerModel, 'findOne').returns(findPlayer)      
      var saveSpy = sinon.spy(playerModel, 'save')

      //act
      sut_saveRankings(json)

      //assert
      expect(findPlayerStub).to.have.been.calledWith({ playerId: json.player_id })      
    })   
})