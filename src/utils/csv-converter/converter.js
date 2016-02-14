import convertDataToJson from './convert-datatojson'
import fs from 'fs'
import path from 'path'
import Promise from 'bluebird'

export default function convert(filePath, headers, firstLineContainsHeader) {
	return new Promise((resolve, reject) => {
		try {				
			fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
			    if (!err){
			    	convertDataToJson(data, headers, firstLineContainsHeader).then((result) => {			    				    		
						resolve(result)
			    	}).catch((err) => {
			    		reject(err)
			    	})		    
			    } else {
			        reject(err)
			    }		
			})
		}
		catch(err) {
			reject(err)
		}		
	})
}
