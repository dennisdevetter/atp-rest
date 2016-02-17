import sut_csvConverter from '../index'

describe('utils', () => {  	
	describe('csv converter', () => {

		it('should not be empty', () => {
			expect(sut_csvConverter).to.not.be.empty
		})
	})
})


