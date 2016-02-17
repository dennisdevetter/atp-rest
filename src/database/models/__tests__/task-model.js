var taskModel = require('../task-model')
var sut_taskModel = taskModel.default

describe('database', () => {
	describe('models', () => {
		describe('task model', () => {
			it('should return the model', () => {                       	    		    
			    expect(sut_taskModel.modelName).to.be.equal('Task')
			})

			it('should create a schema', () => {                       	    
			    var result = taskModel.getSchema()	    

				expect(result.paths['taskId']).to.be.ok 
				expect(result.paths['lastExecutedOn']).to.be.ok 
				expect(result.paths['status']).to.be.ok		
			})		

			it('should create a new model', () => {
				var result = sut_taskModel.create({})
				expect(result).to.not.be.empty			
			})
		})
	})
})
