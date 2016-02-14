import convertCsvToJson from '../../utils/csv-converter'

export default function convertFileToJson(filePath, configuration) {
	var { schema, firstLineContainsHeader = false } = configuration				
	console.log(`importing file ${filePath}...`)			
	
	return new Promise((resolve, reject) => {
		convertCsvToJson(filePath, schema, firstLineContainsHeader).then((items) => {		
			resolve(items)							
		}).catch((error) => {
			reject(error)
		})		
	})
}