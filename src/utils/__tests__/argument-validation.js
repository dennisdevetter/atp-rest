var argumentValidation  = require('../argument-validation')
var sut_validateRequiredArgument = argumentValidation.validateRequiredArgument  

export default function tests() {
	describe('argument validation', () => {
		it('should not be empty', () => {
			expect(sut_validateRequiredArgument).to.not.be.empty			
			expect(typeof(sut_validateRequiredArgument)).to.equal('function')
		})
		
		it('should not throw if all the arguments are valid', () => {
			var args = { aaa: 1, bbb: 2, ccc: 3}
			sut_validateRequiredArgument(args)
		})

		it('should throw if some of the arguments are null', () => {
			var args = { aaa: 1, bbb: null, ccc: 3}
			expect(sut_validateRequiredArgument.bind(argumentValidation, args)).to.throw()
		})
	})
}