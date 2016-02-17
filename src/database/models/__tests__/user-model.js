var userModel = require('../user-model')
var sut_userModel = userModel.default

describe('database', () => {
	describe('models', () => {
		describe('user model', () => {
			it('should return the model', () => {                       	    		    
			    expect(sut_userModel.modelName).to.be.equal('User')
			})

			it('should create a schema', () => {                       	    
			    var result = userModel.getSchema()	    

				expect(result.paths['username']).to.be.ok 
				expect(result.paths['email']).to.be.ok 
				expect(result.paths['password']).to.be.ok
			})	

			it('should create a new model', () => {
				var result = sut_userModel.create({})
				expect(result).to.not.be.empty			
			})
		})
	})
})