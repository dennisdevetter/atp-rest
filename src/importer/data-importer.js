import convertCsvToJson from './csv-converter';
import taskRunner from './task-runner';
import config from '../config';
import Promise from 'bluebird';
import fs from 'fs';	

// =======================================================================================
// Start the importer based on its configuration
// =======================================================================================
export default function importer(configurations) {		
	resolveTargetFiles(configurations).then(startImport);
}

// =======================================================================================
// Executes the import task
// =======================================================================================
function startImport(targetFiles) {	
	if (!targetFiles) {
		console.log('nothing to import');
		return;
	}

	var task = {
		taskId: 'importfiles',
		task : handleAllTargetFiles(targetFiles)
	};

	taskRunner.startTask(task);
}

// ==========================================================================================
// based on the configurations returns an array of file matches and its import configuration
// ==========================================================================================
function resolveTargetFiles(configurations) {	
	return new Promise((resolve, reject) => {
		var keys = Object.keys(configurations), targetFiles = [], index = 0;

		function resolveIfFinished() {
			index++;	
			if (index == keys.length) {
				resolve(targetFiles);			
			}
		};

		try {						
			keys.forEach((key) => {
				var configuration = configurations[key];								

				getFileMatches(configuration).then((result) => {										
					result && targetFiles.push(result);	
					resolveIfFinished();		
					
				}).catch((error) => {
					resolveIfFinished();
				});
				
			});							
		}
		catch(error) {
			reject(error);
		}
	});
}

// =====================================================================================
// Retrieves the file contents of a directory, and caches the result
// =====================================================================================
function getContentsOfFolder(path) {
	var cache = {};
	return new Promise((resolve, reject) => {
		var contents = cache[path];
		if (contents){
			resolve(contents);
			return;
		}

		// reads the directory content
		fs.readdir(path, (err, files) => {
			if (err) {
				throw Error(err);
			}
			cache[path] = files;
			resolve(files);
		});
	});
}

// =====================================================================================
// based on the path of the configuration parameter, returns an object 
// with file matches (absolute paths) and the import configuration
// =====================================================================================
function getFileMatches(configuration) {

	var { path } = configuration;

	return new Promise((resolve, reject) => {
		var dataFolder = getDataFolder();
		var filePath = dataFolder + path;

		try {
			getContentsOfFolder(dataFolder).then((files) => {
				var matches = files.filter((file) => file.match(path)).sort().reverse();

				// return the absolute paths to the files.
				var filePaths = [];
				matches.forEach((match) => {
					filePaths.push(dataFolder + match);
				});

				resolve({
					filePaths,
					configuration
				});
			});			
		}
		catch (error) {
			reject(error);
		}
	})
}

// =======================================================================================
// handles the import for all the resolved target files and its configurations
// =======================================================================================
function handleAllTargetFiles(targetFiles){

	// the task info is given by the task runner on each run.
	// it gives information about tasks run in history.
	return (taskInfo) => {
		var lastPromise = targetFiles.reduce((promise, target) => {					
			return promise.then(() => {			
				return handleTargetFile(target, taskInfo);
			});
		}, Promise.resolve());

		return lastPromise;
	};
}

// =======================================================================================
// handles the import for all resolved files using the import configuration
// =======================================================================================
function handleTargetFile(targetFile, taskInfo) {
	var { filePaths, configuration } = targetFile;

	var lastPromise = filePaths.reduce((promise, filePath) => {					
		return promise.then(() => {			
			return doImport(filePath, configuration, taskInfo);
		});
	}, Promise.resolve());

	return lastPromise;
}


// =====================================================================================
// Reads the file as a JSON object and saves the data to the database
// =====================================================================================
function convertFileToJsonAndSaveToDatabase(filePath, configuration	) {
	var { schema, firstLineContainsHeader = false, onSave } = configuration	;		
	var failed = 0, succeeded = 0;		
	console.log(`importing file ${filePath}...`);			
	
	return new Promise((resolve, reject) => {
		convertCsvToJson(filePath, schema, firstLineContainsHeader).then((items) => {		
			function resolveIfFinished(){
				if (succeeded + failed == items.length) {
					console.log('import done.');
					// todo: add the success and failed count for the individual items
					// so that it can be taken into account for the task runner
					resolve();
				}
			}

			if (items && items.length) {					
				items.forEach((item) => {					
					onSave(item).then(() => {
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

// =====================================================================================
// Based on the modification date or previous task runner determine 
// If an import is needed for the given file
// =====================================================================================
function checkIfImportNeeded(filePath, taskInfo) {
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
		fs.stat(filePath, (err, stats) => {
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

// =====================================================================================
// returns the source folder (absolute path) where the data files are located
// =====================================================================================
function getDataFolder() {
	return config.importer.sourcePath;
}

// =====================================================================================
// Import the data for a given file ands its import configuration
// =====================================================================================
function doImport(filePath, configuration, taskInfo){	
		
	var { lastExecutedOn, status } = taskInfo;	

	return new Promise((resolve, reject) => {		
		try {				
			checkIfImportNeeded(filePath, taskInfo).then(({shouldImport}) => {
				if (shouldImport) {					
					convertFileToJsonAndSaveToDatabase(filePath, configuration).then(resolve);					
				} else {
					console.log(`skipping file ${filePath} because it hasnt been modified`);
					resolve();	
				}
			})			
		}
		catch(error) {
			reject(error);
		}		
	});	
}