import sut_taskrunner from '../index'

describe('utils', () => {  				
	describe('task runner', () => {
		it('should not be empty', () => {
			expect(sut_taskrunner).to.not.be.empty
		})
	})
})