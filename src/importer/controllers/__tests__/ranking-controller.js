import PlayerModel from '../../../database/models/player-model'
import controller from '../ranking-controller'
import Promise from 'bluebird'

describe('importer rankings controller', () => {
    
    var sut_saveRankings = controller.save

  	it ('should not save when the player cannot be found', () => {

      var cannotFindThePlayer = new Promise((resolve, reject) => resolve(null))      
      var findPlayerStub = root.sandbox.stub(PlayerModel, 'findOne').returns(cannotFindThePlayer)      
      var json = { player_id  : '123456' }

      sut_saveRankings(json)

      expect(findPlayerStub).to.have.been.calledWith({ playerId: json.player_id })            
  	})    

    it ('should not save when the ranking was already saved', () => {

      var playerModel = { playerId: '123456', ranking: [ { date: 'some ranking' }], save: sinon.spy() }
      var findPlayer = new Promise((resolve, reject) => resolve(playerModel))      
      var findPlayerStub = root.sandbox.stub(PlayerModel, 'findOne').returns(findPlayer)
      var json = { player_id  : '123456', ranking_date: 'some ranking' }

      sut_saveRankings(json)

      expect(findPlayerStub).to.have.been.calledWith({ playerId: json.player_id })
      expect(playerModel.save).to.not.have.been.called
    })    

    it ('should save when the ranking was not found for the player', (done) => {

      var savePromise = () => new Promise((resolve, reject) => {
          expect(saveSpy).to.have.been.called          
          done()
       })

      var playerModel = {
       playerId: '123456', 
       firstName: 'john',
       lastName: 'Do',
       ranking: [],        
       save : savePromise
      }

      var json = { player_id  : '123456', ranking_date: 'some ranking', ranking_points: '100' }
      var findPlayer = new Promise((resolve, reject) => resolve(playerModel))            
      var findPlayerStub = root.sandbox.stub(PlayerModel, 'findOne').returns(findPlayer)      
      var saveSpy = sinon.spy(playerModel, 'save')

      sut_saveRankings(json)

      expect(findPlayerStub).to.have.been.calledWith({ playerId: json.player_id })      
    })   
})