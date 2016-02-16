var getStatusMessage = require('../status-message')
var sut_getStatusMessage = getStatusMessage.default

export default function tests() {
	describe('status message', () => {
		it('should return correct string for status 1', () => {						
			var result = sut_getStatusMessage(1)
			expect(result).to.equal('succesfully')
		}) 	

		it('should return correct string for status 2', () => {						
			var result = sut_getStatusMessage(2)
			expect(result).to.equal('failed')
		}) 	

		it('should return correct string for any other status', () => {						
			var statusses = [null, 0, 3, 4]

			statusses.forEach((status) => {
				var result = sut_getStatusMessage(status)
				expect(result).to.equal('(not yet)')	
			})
		}) 	
		
	})
}


