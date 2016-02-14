import sut_rankings from '../rankings'

export default function tests() {
  describe('rankings', () => {
    	it ('should not be null', () => {
    		expect(sut_rankings).to.not.be.empty
    	})

      it('should have 2 values', () => {    
        expect(Object.keys(sut_rankings).length).to.equal(2)
      })

      it('should have atp player rankings', () => {        
      	var rankings = sut_rankings['atp_player_rankings']
      	expect(rankings).to.not.be.empty
      	expect(rankings.schema).to.deep.equal(expectedSchema)
      	expect(rankings.path).to.equal('atp_rankings_current.csv')
      	expect(rankings.onSave).to.not.be.empty
      })

      it('should have wta player rankings', () => {        
      	var rankings = sut_rankings['wta_player_rankings']
      	expect(rankings).to.not.be.empty
      	expect(rankings.schema).to.deep.equal(expectedSchema)
      	expect(rankings.path).to.equal('wta_rankings_current.csv')
      	expect(rankings.onSave).to.not.be.empty
      })  
    })
}

const expectedSchema = [
  'ranking_date', 
  'ranking', 
  'player_id', 
  'ranking_points', 
  'tours' 
]