import utils from '../index'

describe('api', () => {
	describe ('utils', () => {
		it('should not be empty', () => {
			expect(utils).to.not.be.empty			
		})

		it('should have all the utilities', () => {			
			expect(utils['tokenizer']).to.not.be.empty
		})		
	})		
})
