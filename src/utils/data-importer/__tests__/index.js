import sut_dataImporter from '../index'

export default function tests() {
	describe('data importer', () => {

		it('should not be empty', () => {
			expect(sut_dataImporter).to.not.be.empty
		})

		require('./convert-files').default()		
		require('./do-import').default()
	})
}