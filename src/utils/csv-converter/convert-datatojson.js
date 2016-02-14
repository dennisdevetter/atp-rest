import { Converter } from 'csvtojson'

export default function convertDataToJson(value, headers, firstLineContainsHeader = false) {
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