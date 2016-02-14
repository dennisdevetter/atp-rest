import checkIfImportNeeded from './pre-import-check'
import convertFileToJson from './convert-files'
import saveToDatabase from './save-to-database'

export default function doImport(filePath, configuration, taskInfo){	
		
	var { lastExecutedOn, status } = taskInfo	

	return new Promise((resolve, reject) => {		
		try {				
			checkIfImportNeeded(filePath, taskInfo).then(({shouldImport}) => {
				if (shouldImport) {					
					convertFileToJson(filePath, configuration)
						.then((json) => saveToDatabase(json, configuration))
						.then(resolve)					
				} else {
					console.log(`skipping file ${filePath} because it hasnt been modified`)
					resolve()	
				}
			})			
		}
		catch(error) {
			reject(error)
		}		
	})	
}