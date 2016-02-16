import checkIfImportNeeded from './pre-import-check'
import convertFileToJson from './convert-files'
import saveToDatabase from './save-to-database'
import { validateRequiredArgument } from '../../utils/argument-validation'
import logger from '../../utils/logger'

export default function doImport(filePath, configuration, taskInfo){		
	validateRequiredArgument({filePath, configuration, taskInfo})

	var { onSave } = configuration
	validateRequiredArgument({ onSave })

	return new Promise((resolve, reject) => {		
		try {				
			checkIfImportNeeded(filePath, taskInfo).then(({shouldImport}) => {
				if (shouldImport) {					
					convertFileToJson(filePath, configuration)
						.then((json) => saveToDatabase(json, { saveItem: onSave }))
						.then(resolve)
						.catch(reject)								
				} else {
					logger.log(`skipping file ${filePath} because it hasnt been modified`)
					resolve()	
				}
			}).catch(reject)			
		}
		catch(error) {
			reject(error)
		}		
	})	
}