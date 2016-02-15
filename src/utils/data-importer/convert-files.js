import convertCsvToJson from '../../utils/csv-converter'
import { validateRequiredArgument } from '../../utils/argument-validation'
import logger from '../../utils/logger'

export default function convertFileToJson(filePath, configuration) {
	var { schema, firstLineContainsHeader = false } = configuration || {}
	validateRequiredArgument( { filePath, schema })

	logger.log(`importing file ${filePath}...`)				
	return new Promise((resolve, reject) => {
		convertCsvToJson(filePath, schema, firstLineContainsHeader).then((items) => {		
			resolve(items)							
		}).catch((error) => {
			reject(error)
		})		
	})
}