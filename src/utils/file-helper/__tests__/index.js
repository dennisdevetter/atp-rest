import sut_fileHelper from '../index'

export default function tests() {
	describe('file helper', () => {

		it('should not be empty', () => {
			expect(sut_fileHelper).to.not.be.empty
		})

		require('./get-contents-of-folder').default()		
	})
}