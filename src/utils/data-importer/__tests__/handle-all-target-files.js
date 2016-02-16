var handleTargetFile = require('../handle-target-file')
var handleAllTargetFiles = require('../handle-all-target-files')
var sut_handleAllTargetFiles = handleAllTargetFiles.default

export default function tests() {
	describe('handle all target files', () => {
		it('should throw exception if the path is null', () => {
			var targetFiles = null
			expect(sut_handleAllTargetFiles.bind(handleAllTargetFiles, targetFiles)).to.throw('targetFiles cannot be null')
		})

		it('should resolve all the matching files sorted descending', () => {
			
		})		
	})
}


