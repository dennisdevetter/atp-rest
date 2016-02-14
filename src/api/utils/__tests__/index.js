import tokenizer from './tokenizer'
import utils from '../index'

export default function tests() {
	describe ('utils', () => {

		it('should not be empty', () => {
			expect(utils).to.not.be.empty			
		})

		it('should have all the utilities', () => {			
			expect(utils['tokenizer']).to.not.be.empty
		})

		tokenizer()
	})	
}