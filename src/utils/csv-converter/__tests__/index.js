import sut_csvConverter from '../index'

export default function tests() {
	describe('csv converter', () => {

		it('should not be empty', () => {
			expect(sut_csvConverter).to.not.be.empty
		})

		require('./convert-datatojson').default()		
		require('./converter').default()		
	})
}


