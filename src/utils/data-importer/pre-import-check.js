import Promise from 'bluebird'
import fs from 'fs'

export default function checkIfImportNeeded(filePath, taskInfo) {
	var { lastExecutedOn, status } = taskInfo

	var errorStatus = 2

	return new Promise((resolve, reject) => {
		// when the task failed before always execute again.
		if (status == errorStatus) {
			resolve({ shouldImport: true })
			return
		}
		
		if (process.argv.find((arg) => (arg && arg.toLowerCase()) == 'force')) {			
			resolve({ shouldImport: true })
			return
		}


		// checks if the file was modified after the last task run.
		fs.stat(filePath, (err, stats) => {
			if (!err) {
				var lastModifiedDate = stats.mtime
				var isFileModifiedAfterLastSync = lastModifiedDate > lastExecutedOn
				resolve( { shouldImport : isFileModifiedAfterLastSync})				
			} else {
				reject(err)
			}
		})		
	})
}