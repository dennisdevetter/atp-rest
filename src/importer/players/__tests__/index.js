import systemUnderTest from '../index'

const expectedSchema = [
  'player_id', 
  'first_name', 
  'last_name', 
  'hand', 
  'birth_date', 
  'country_code'
]

describe('importer players', () => {  
  	it ('should not be null', () => {
  		expect(systemUnderTest).to.not.be.empty
  	})

    it('should have 2 values', () => {    
      expect(Object.keys(systemUnderTest).length).to.equal(2)
    })

    it('should have atp players', () => {        
    	var rankings = systemUnderTest['atp_players']
    	expect(rankings).to.not.be.empty
    	expect(rankings.schema).to.deep.equal(expectedSchema)
    	expect(rankings.path).to.equal('atp_players.csv')
    	expect(rankings.onSave).to.not.be.empty
    })

      it('should have wta players', () => {        
    	var rankings = systemUnderTest['wta_players']
    	expect(rankings).to.not.be.empty
    	expect(rankings.schema).to.deep.equal(expectedSchema)
    	expect(rankings.path).to.equal('wta_players.csv')
    	expect(rankings.onSave).to.not.be.empty
    })  
})