var matchModel = require('../match-model')
var sut_matchModel = matchModel.default

describe('database', () => {
	describe('models', () => {
		describe('match model', () => {
			it('should return the model', () => {                       	    		    
			    expect(sut_matchModel.modelName).to.be.equal('Match')
			})

			it('should create a schema', () => {                       	    
			    var result = matchModel.getSchema()	    

				expect(result.paths['tourneyId']).to.be.ok 
				expect(result.paths['tourneyName']).to.be.ok 
				expect(result.paths['tourneyLevel']).to.be.ok
				expect(result.paths['tourneyDate']).to.be.ok
				expect(result.paths['match']).to.be.ok
				expect(result.paths['surface']).to.be.ok
				expect(result.paths['drawSize']).to.be.ok
				expect(result.paths['winnerId']).to.be.ok
				expect(result.paths['winnerIoc']).to.be.ok
				expect(result.paths['loserId']).to.be.ok
				expect(result.paths['loserIoc']).to.be.ok
				expect(result.paths['score']).to.be.ok
				expect(result.paths['bestOf']).to.be.ok
				expect(result.paths['round']).to.be.ok
				expect(result.paths['minutes']).to.be.ok
				expect(result.paths['wAce']).to.be.ok
				expect(result.paths['wDf']).to.be.ok
				expect(result.paths['wSvpt']).to.be.ok
				expect(result.paths['w1stIn']).to.be.ok
				expect(result.paths['w1stWon']).to.be.ok
				expect(result.paths['wSvGms']).to.be.ok
				expect(result.paths['wBpSaved']).to.be.ok
				expect(result.paths['wBpFaced']).to.be.ok
				expect(result.paths['lAce']).to.be.ok
				expect(result.paths['lDf']).to.be.ok
				expect(result.paths['lSvpt']).to.be.ok
				expect(result.paths['l1stIn']).to.be.ok
				expect(result.paths['l1stWon']).to.be.ok
				expect(result.paths['l2ndWon']).to.be.ok
				expect(result.paths['lSvGms']).to.be.ok
				expect(result.paths['lBpSaved']).to.be.ok			
				expect(result.paths['lBpFaced']).to.be.ok
			})		

			it('should create a new model', () => {
				var result = sut_matchModel.create({})
				expect(result).to.not.be.empty			
			})
		})
	})
})
