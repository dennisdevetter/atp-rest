import sut_configuration from '../index'

export default function tests() {
	describe('configuration', () => {
		it('should have correct value', () => {                            	
			var sut_configuration = require('../index').default
			var keys = Object.keys(sut_configuration)

			expect(sut_configuration).to.not.be.empty
			expect(sut_configuration).to.have.all.keys['playersConfig', 'rankingsConfig', 'matchesConfig']			
		})

		require('./matches').default()
		require('./players').default()
		require('./rankings').default()
	})
}