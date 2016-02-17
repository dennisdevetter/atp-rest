import sut_matches from '../matches'

describe('importer', () => {  
	describe('configuration', () => {
		describe('matches', () => {
			it ('should not be null', () => {
		  		expect(sut_matches).to.not.be.empty
		  	})

		    it('should have one value', () => {    
		      expect(Object.keys(sut_matches).length).to.equal(1)
		    })

		    it('should have correct value for the matches configuration', () => {        
		    	var matches = sut_matches['matches']
		    	expect(matches).to.not.be.empty
		    	expect(matches.schema).to.deep.equal(expectedSchema)
		    	expect(matches.path).to.equal('(atp|wta)_matches_\\d{4}.csv')
		    	expect(matches.onSave).to.not.be.empty
		    })    
		})
	})
})

const expectedSchema = [
	'tourney_id',
	'tourney_name',
	'surface',
	'draw_size',
	'tourney_level',
	'tourney_date',
	'match_num',
	'winner_id',
	'winner_seed',
	'winner_entry',
	'winner_name',
	'winner_hand',
	'winner_ht',
	'winner_ioc',
	'winner_age',
	'winner_rank',
	'winner_rank_points',
	'loser_id',
	'loser_seed',
	'loser_entry',
	'loser_name',
	'loser_hand',
	'loser_ht',
	'loser_ioc',
	'loser_age',
	'loser_rank',
	'loser_rank_points',
	'score',
	'best_of',
	'round',
	'minutes',
	'w_ace',
	'w_df',
	'w_svpt',
	'w_1stIn',
	'w_1stWon',
	'w_2ndWon',
	'w_SvGms',
	'w_bpSaved',
	'w_bpFaced',
	'l_ace',
	'l_df',
	'l_svpt',
	'l_1stIn',
	'l_1stWon',
	'l_2ndWon',
	'l_SvGms',
	'l_bpSaved',
	'l_bpFaced'
]