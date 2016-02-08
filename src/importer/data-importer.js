import convertCsvToJson from './csv-converter';
import taskRunner from './task-runner';
import config from '../config';
import Promise from 'bluebird';
import fs from 'fs';	

export default function importer(configuration){	
	return taskRunner.startTask( {
		taskId: 'importfiles',
		task: createTask(configuration)
	});
}

function createTask(configuration) {
	return (taskInfo) => {		
		var keys = Object.keys(configuration);

		var lastPromise = keys.reduce((promise, key) => {		
			return promise.then(() => {			
				var options = configuration[key];
				return doImport(options, taskInfo);
			});
		}, Promise.resolve());

		return lastPromise;
	}
}

function convertFileToJsonAndSaveToDatabase(options) {
	var { path, schema, firstLineContainsHeader = false } = options;	
	var absolutePath = getAbsolutePathFromFileName(path);
	var failed = 0, succeeded = 0;		
	console.log(`importing path ${absolutePath}...`);			
	
	return new Promise((resolve, reject) => {
		convertCsvToJson(absolutePath, schema, firstLineContainsHeader).then((items) => {		
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
	});
}

function checkIfImportNeeded(absolutePath, taskInfo) {
	var { lastExecutedOn, status } = taskInfo;

	var errorStatus = 2;

	return new Promise((resolve, reject) => {
		// when the task failed before always execute again.
		if (status == errorStatus) {
			resolve({ shouldImport: true });
			return;
		}
		
		if (process.argv.find((arg) => (arg && arg.toLowerCase()) == 'force')) {			
			resolve({ shouldImport: true });
			return;
		}


		// checks if the file was modified after the last task run.
		fs.stat(absolutePath, (err, stats) => {
			if (!err) {
				var lastModifiedDate = stats.mtime;
				var isFileModifiedAfterLastSync = lastModifiedDate > lastExecutedOn;
				resolve( { shouldImport : isFileModifiedAfterLastSync});				
			} else {
				reject(err);
			}
		});		
	});
}

function getAbsolutePathFromFileName(filename) {
	// TODO: handle wildcards ?
	var absolutePath = config.importer.sourcePath + filename;
	return absolutePath;
}

function doImport(options = {}, taskInfo){	
	
	var { path } = options;	
	var { lastExecutedOn, status } = taskInfo;	
	var absolutePath = getAbsolutePathFromFileName(path);

	return new Promise((resolve, reject) => {		
		try {				
			checkIfImportNeeded(absolutePath, taskInfo).then(({shouldImport}) => {
				if (shouldImport) {
					convertFileToJsonAndSaveToDatabase(options).then(resolve);					
				} else {
					console.log(`skipping file ${path} because it hasnt been modified`);
					resolve();	
				}
			})			
		}
		catch(error) {
			reject(error);
		}		
	});	
}

function saveItem(options, item){  
  var { onSave } = options;
  return onSave(item);
}