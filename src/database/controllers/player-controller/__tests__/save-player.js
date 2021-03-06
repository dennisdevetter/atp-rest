import PlayerModel from '../../../../database/models/player-model'
import sut_savePlayer from '../save-player'

describe('database', () => {
  describe('controllers', () => {
    describe('player controller', () => { 
      describe('save player', () => {
      	it ('should not save when the player is already found', () => {

            var options = { sex: 'M'}
            var playerModel = { playerId: '123456', save: sinon.spy() }
            var playerWasFound = Promise.resolve(playerModel)       
            var findPlayer = root.sandbox.stub(PlayerModel, 'findOne').returns(playerWasFound)      
            var jsonPlayer = createJsonPlayer(options)
            var findPlayerQuery = { playerId: jsonPlayer.player_id }

            sut_savePlayer(options)(jsonPlayer)

            expect(findPlayer).to.have.been.calledWith(findPlayerQuery)      
            expect(playerModel.save).to.not.have.been.called
        	})   

          it ('should save when the player is not found', (done) => {

            var options = { sex: 'M' }      
            var playerWasNotFound = Promise.resolve(null)          
            var findPlayer = root.sandbox.stub(PlayerModel, 'findOne').returns(playerWasNotFound)        
            var playerModel = { save : () => Promise.resolve() }
            var createModel = sinon.stub(PlayerModel, 'create').returns(playerModel)      
            var saveThePlayer = sinon.spy(playerModel, 'save')                  
            var jsonPlayer = createJsonPlayer(options)
            var newPlayerModel = createPlayerModel(jsonPlayer)
            var findPlayerQuery = { playerId: jsonPlayer.player_id }
            
            sut_savePlayer(options)(jsonPlayer)

            expect(findPlayer).to.have.been.calledWith(findPlayerQuery)    
            playerModel.save().then(() => {
                expect(saveThePlayer).to.have.been.called       
                expect(createModel).to.have.been.calledWith(newPlayerModel)        
                done()
            }).catch(done)           
          })   
      })
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