import PlayerModel from '../../../database/models/player-model'
import controller from '../controller'
import Promise from 'bluebird'

describe('importer players controller', () => {
 
    var sut_savePlayer = controller.save

  	it ('should not save when the player is already found', () => {

      // arrange
      var options = { sex: 'M'}
      var playerModel = { playerId: '123456', save: sinon.spy() }
      var playerWasFound = new Promise((resolve, reject) => resolve(playerModel))          
      var findPlayer = root.sandbox.stub(PlayerModel, 'findOne').returns(playerWasFound)      
      var jsonPlayer = createJsonPlayer(options)
      var findPlayerQuery = { playerId: jsonPlayer.player_id }

      //act
      sut_savePlayer(options)(jsonPlayer)

      //assert
      expect(findPlayer).to.have.been.calledWith(findPlayerQuery)      
      expect(playerModel.save).to.not.have.been.called
  	})   

    it ('should save when the player is not found', (done) => {

      // arrange
      var options = { sex: 'M' }      
      var playerWasNotFound = new Promise((resolve, reject) => resolve(null))          
      var findPlayer = root.sandbox.stub(PlayerModel, 'findOne').returns(playerWasNotFound)        
      var playerModel = { save : () => new Promise((resolve, reject) => resolve()) }
      var createModel = sinon.stub(PlayerModel, 'create').returns(playerModel)      
      var saveThePlayer = sinon.spy(playerModel, 'save')
                   
      var jsonPlayer = createJsonPlayer(options)
      var newPlayerModel = createPlayerModel(jsonPlayer)
      var findPlayerQuery = { playerId: jsonPlayer.player_id }
      
      
      //act
      sut_savePlayer(options)(jsonPlayer)

      //assert
      expect(findPlayer).to.have.been.calledWith(findPlayerQuery)    
      playerModel.save().then(() => {
          expect(saveThePlayer).to.have.been.called       
          expect(createModel).to.have.been.calledWith(newPlayerModel)        
          done()
      })           
    })   
})

// helper methods
function createJsonPlayer(options) {
  var { sex } = options

   var jsonPlayer = { 
      player_id  : '123456',
      first_name : 'first name',
      last_name : 'last name',
      hand : 'hand',
      birth_date : 'birth date',
      country_code : 'counry code',
      sex: sex 
    } 
    return jsonPlayer
}

function createPlayerModel(jsonPlayer){
  return {
      playerId : jsonPlayer.player_id,
      firstName: jsonPlayer.first_name,
      lastName: jsonPlayer.last_name,
      hand : jsonPlayer.hand,
      birthdate : jsonPlayer.birth_date,
      country : jsonPlayer.country_code,
      sex: jsonPlayer.sex
    }
}