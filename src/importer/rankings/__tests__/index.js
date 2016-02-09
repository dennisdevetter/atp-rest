import systemUnderTest from '../index'

const expectedSchema = [
	'ranking_date', 
	'ranking', 
	'player_id', 
	'ranking_points', 
	'tours'	
]

describe('rankings', () => {
  describe('return value', () => {

  	it ('should not be null', () => {
  		expect(systemUnderTest).to.not.be.empty
  	})

    it('should have 2 values', () => {    
      expect(Object.keys(systemUnderTest).length).to.equal(2)
    })

    it('should have atp player rankings', () => {        
    	var rankings = systemUnderTest['atp_player_rankings']
    	expect(rankings).to.not.be.empty
    	expect(rankings.schema).to.deep.equal(expectedSchema)
    	expect(rankings.path).to.equal('atp_rankings_current.csv')
    	expect(rankings.onSave).to.not.be.empty
    })

      it('should have wta player rankings', () => {        
    	var rankings = systemUnderTest['wta_player_rankings']
    	expect(rankings).to.not.be.empty
    	expect(rankings.schema).to.deep.equal(expectedSchema)
    	expect(rankings.path).to.equal('wta_rankings_current.csv')
    	expect(rankings.onSave).to.not.be.empty
    })
  })
})