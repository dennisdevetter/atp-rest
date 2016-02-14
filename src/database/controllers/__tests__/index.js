import sut_controllers from '../index'

export default function tests() {
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

		require('../match-controller/__tests__').default()
		require('../task-controller/__tests__').default()
		require('../ranking-controller/__tests__').default()
		require('../player-controller/__tests__').default()
	})
}

