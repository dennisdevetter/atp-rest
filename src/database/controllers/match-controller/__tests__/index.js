import sut_controller from '../index'

describe('database', () => {
	describe('controllers', () => {
		describe('match controller', () => {
			it('should not be empty', () => {                          
				expect(sut_controller).to.not.be.empty  				
			 })

			 it('should have all the capabilities', () => {
			 	expect(Object.keys(sut_controller).length).to.equal(3)		
				expect(sut_controller).to.have.all.keys(['saveMatch', 'getMatch', 'queryMatch'])
			 })
		})
	})
})

 