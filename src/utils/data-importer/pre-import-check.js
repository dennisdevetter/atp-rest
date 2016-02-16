import taskConstants from '../../database/constants/task'
import { validateRequiredArgument } from '../../utils/argument-validation'
import fs from 'fs'

export default function checkIfImportNeeded(filePath, taskInfo) {	
	validateRequiredArgument({ filePath })

	return new Promise((resolve, reject) => {		
		function shouldImport(value) {
			resolve({ shouldImport: value })
		}

		try {			
			if (forceImport()) {							
				shouldImport(true)											
				return
			}

			if (taskInfo) {
				determineImportByTaskInfo(filePath, taskInfo)
						.then(shouldImport).catch(reject)				
				return
			} 

			shouldImport(false)				

		} 
		catch(error) {
			reject(error)
		}
	})
}

function forceImport() {	
	return process.argv.find((arg) => (arg && arg.toLowerCase()) == 'force')	
}

function determineImportByTaskInfo(filePath, taskInfo) {
	var { lastExecutedOn, status } = taskInfo || {}
	validateRequiredArgument({ lastExecutedOn, status })

	return new Promise((resolve, reject) => {
		try {
			if (status == taskConstants.statusses.error) {
				resolve(true)
				return
			}

			fs.stat(filePath, (err, stats) => {
				if (!err) {
					var lastModifiedDate = stats.mtime										
					resolve(lastModifiedDate > lastExecutedOn)					
				} else {
					reject(err)
				}
			})	
		}
		catch(error) {
			reject(error)
		}
	})
}