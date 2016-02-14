import sut_taskrunner from '../index'

export default function tests() {
	describe('task runner', () => {

		it('should not be empty', () => {
			expect(sut_taskrunner).to.not.be.empty
		})

		require('./finish-task').default()
		require('./start-task').default()
	})
}