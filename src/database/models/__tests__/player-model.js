var playerModel = require('../player-model')
var sut_playerModel = playerModel.default

describe('database', () => {
	describe('models', () => {
		describe('player model', () => {
			it('should return the model', () => {                       	    		    
			    expect(sut_playerModel.modelName).to.be.equal('Player')
			})

			it('should create a schema', () => {                       	    
			    var result = playerModel.getSchema()	    

				expect(result.paths['playerId']).to.be.ok 
				expect(result.paths['firstName']).to.be.ok 
				expect(result.paths['lastName']).to.be.ok
				expect(result.paths['hand']).to.be.ok
				expect(result.paths['birthdate']).to.be.ok
				expect(result.paths['country']).to.be.ok
				expect(result.paths['sex']).to.be.ok
				expect(result.paths['ranking']).to.be.ok
			})		

			it('should create a new model', () => {
				var result = sut_playerModel.create({})
				expect(result).to.not.be.empty			
			})
		})
	})
})

