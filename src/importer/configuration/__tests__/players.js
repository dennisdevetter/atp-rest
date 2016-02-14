import sut_players from '../players'

export default function tests() {  
  describe('players', () => {
    	it ('should not be null', () => {
    		expect(sut_players).to.not.be.empty
    	})

      it('should have 2 values', () => {    
        expect(Object.keys(sut_players).length).to.equal(2)
      })

      it('should have atp players', () => {        
      	var rankings = sut_players['atp_players']
      	expect(rankings).to.not.be.empty
      	expect(rankings.schema).to.deep.equal(expectedSchema)
      	expect(rankings.path).to.equal('atp_players.csv')
      	expect(rankings.onSave).to.not.be.empty
      })

      it('should have wta players', () => {        
      	var rankings = sut_players['wta_players']
      	expect(rankings).to.not.be.empty
      	expect(rankings.schema).to.deep.equal(expectedSchema)
      	expect(rankings.path).to.equal('wta_players.csv')
      	expect(rankings.onSave).to.not.be.empty
      })  
    })
}

const expectedSchema = [
  'player_id', 
  'first_name', 
  'last_name', 
  'hand', 
  'birth_date', 
  'country_code'
]