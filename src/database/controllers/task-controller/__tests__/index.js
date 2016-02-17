import sut_controller from '../index'

describe('database', () => {
  describe('controllers', () => {
		describe('task controller',() => {
			it('should not be empty', () => {                          
				expect(sut_controller).to.not.be.empty  				
			})

			it('should have all the capabilities', () => {
				expect(Object.keys(sut_controller).length).to.equal(4)
				expect(sut_controller).to.have.all.keys(['getTask','ensureTask','createTask','saveTask'])		
			})
		})
	})
})
