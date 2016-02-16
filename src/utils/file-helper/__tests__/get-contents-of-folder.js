import fs from 'fs'
var cacheHelper = require('../../cache-helper')
var getContentsOfFolder = require('../get-contents-of-folder')	
var sut_getContentsOfFolder = getContentsOfFolder.default

export default function tests() {
	describe('get contents of folder', () => {
		var files = ['file1.txt', 'file2.txt', 'file3.txt']
		var path='C:\\temp3\\'			

		it('should resolve the contents of a folder if it was not cached yet', (done) => {			
			var readDirFunc = (path, callback) => callback(null, files)
			var readDirStub = root.sandbox.stub(fs, 'readdir', readDirFunc)

			var promise = sut_getContentsOfFolder(path)
 
			promise.then((result) => {
				expect(readDirStub).to.have.been.calledWith(path)
				expect(result).to.equal(files)
				done()
			}).catch(done)
		})

		it('should resolve the contents of a folder from cache', (done) => {
			var readDirStub = root.sandbox.stub(fs, 'readdir')

			var promise = sut_getContentsOfFolder(path)
 
			promise.then((result) => {
				expect(readDirStub).to.not.have.been.called
				expect(result).to.equal(files)
				done()
			}).catch(done)
		})

		it('should reject if reading the contents of the directory fails', (done) => {
			var filePath = 'some path'
			var somethingWentWrong = 'error'
			var readDirFunc = (path, callback) => callback(somethingWentWrong, null)
			var readDirStub = root.sandbox.stub(fs, 'readdir', readDirFunc)

			var promise = sut_getContentsOfFolder(filePath)
 
			promise.catch((error) => {
				expect(readDirStub).to.have.been.calledWith(filePath)
				expect(error).to.be.ok
				expect(error.message).to.equal(somethingWentWrong)
				done()
			}).catch(done)
		})
	})
}