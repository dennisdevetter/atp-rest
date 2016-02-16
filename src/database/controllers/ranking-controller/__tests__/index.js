import sut_controller from '../index'

export default function tests() {
	describe('ranking controller',() => {
		it('should not be empty', () => {                          
			expect(sut_controller).to.not.be.empty  			
		})

		it('should have all the capabilities', () => {
			expect(Object.keys(sut_controller).length).to.equal(1)
			expect(sut_controller).to.have.all.keys(['saveRanking'])
		})

		require('./save-ranking').default()
	})
}

