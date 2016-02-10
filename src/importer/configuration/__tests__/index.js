describe('importer configuration',() => {    
  it('should have correct value', () => {                            	
  		var sut_configuration = require('../index').default
		var keys = Object.keys(sut_configuration)
		
  		expect(sut_configuration).to.not.be.empty
  		expect(keys.length).to.be.above(0)
  })
})  


