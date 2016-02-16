import { Converter } from 'csvtojson'
import { validateRequiredArgument } from '../../utils/argument-validation'

export default function convertDataToJson(value, headers, firstLineContainsHeader = false) {
	validateRequiredArgument({value})
	
	if (!firstLineContainsHeader && !headers) {
		throw new Error('headers are required if first line does not contain headers')
	}

	var converter = new Converter({
		noheader: !firstLineContainsHeader,
		headers: headers
	})

	return new Promise((resolve, reject) => {
		converter.fromString(value,function(err,result){
			if(!err) {				
				resolve(result)
			} else {				
				reject(err)
			}
		})
	})
}