import sut_controllers from '../index'

describe('database', () => {
	describe('controllers', () => {
		it('should have correct value', () => {                          
			expect(sut_controllers).to.not.be.empty  		
			expect(Object.keys(sut_controllers).length).to.equal(4)
			
			expect(sut_controllers).to.have.all.keys([
				'taskController', 
				'rankingController', 
				'matchController', 
				'playerController'
			])		
		}) 			
	})
})

