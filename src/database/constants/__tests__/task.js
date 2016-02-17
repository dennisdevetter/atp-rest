import sut_task from '../task'

describe('database', () => {    	
	describe('constants', () => {
		describe('task', () => {
			it('should return correct value', () => {                            		
				expect(sut_task).to.not.be.empty
				expect(sut_task.statusses.success).to.equal(1)
				expect(sut_task.statusses.error).to.equal(2)
			})
		})
	})
})