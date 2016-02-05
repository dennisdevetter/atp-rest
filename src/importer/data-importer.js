import convertCsvToJson from './csv-converter';
import Promise from 'bluebird';

// TODO configure this path via package json
const sourcePath = '../../data/';

export default function importer(importerConfiguration){

	var keys = Object.keys(importerConfiguration);

	var lastPromise = keys.reduce((promise, key) => {		
		return promise.then(() => {			
			var options = importerConfiguration[key];
			return doImport(options);
		}).catch((error) => {
			console.log(`failed to import configuration with key ${key}. error: ${error}`);
		});
	}, Promise.resolve());

	return lastPromise;
}

function doImport(options = {}){	
	
	var { path, schema } = options;	

	// TODO: handle wildcards ?
	path = sourcePath + path;

	return new Promise((resolve, reject) => {
		var failed = 0;
		var succeeded = 0;		
		try {		
			console.log(`importing path ${path}...`);			
			
			convertCsvToJson(path, schema).then((items) => {		
					function resolveIfFinished(){
						if (succeeded + failed == items.length) {
							console.log('import done.');
							resolve();
						}
					}

					if (items && items.length) {						
						items.forEach((item) => {
							saveItem(options, item).then(() => {
								succeeded++;
								resolveIfFinished();
							}).catch((error) => {
								console.log('failed to save. error:' + error);
								failed++;
								resolveIfFinished();
							});						
						});								
					}							
				}).catch((error) => {
					reject(error);
				});		
		}
		catch(error) {
			reject(error);
		}
		
	});	
}

function saveItem(options, item){  

  var { dataType, identifier, converter, onSave } = options;

  return dataType.findOne(identifier(item)).then((model) => {  		
  		var isNew;
  		if (!model){
			 model = new dataType({});								
			 isNew = true;
  		}

  		converter(model, item);

  		var promise = model.save();

  		if (onSave) {
  			promise.then(onSave(item));
  		}

		return promise;
  });
}