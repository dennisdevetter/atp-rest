import { Converter } from "csvtojson";
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';

function convertDataToJson(value, headers) {
	var converter = new Converter({
		noheader:true,
		headers: headers
	});

	return new Promise((resolve, reject) => {
		converter.fromString(value,function(err,result){
			if(!err) {				
				resolve(result);
			} else {				
				reject(err);
			}
		});
	});
}

export default function convert(filePath, headers){
	return new Promise((resolve, reject) => {
		try {				
			fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
			    if (!err){
			    	convertDataToJson(data, headers).then((result) => {			    				    		
						resolve(result);
			    	}).catch((err) => {
			    		reject(err);
			    	});		    
			    } else {
			        reject(err);
			    }		
			});
		}
		catch(err) {
			reject(err);
		}		
	});
}
