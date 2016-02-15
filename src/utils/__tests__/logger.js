import sut_logger from '../logger'

export default function tests() {
	describe('logger', () => {
		it('should not be empty', () => {
			expect(sut_logger).to.not.be.empty
		})

		it('should have a log method', () => {
			expect(sut_logger.log).to.not.be.empty
			expect(typeof(sut_logger.log)).to.equal('function')
		})
	})
}