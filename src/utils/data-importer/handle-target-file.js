import doImport from 'do-import'

export default function handleTargetFile(targetFile, taskInfo) {
	var { filePaths, configuration } = targetFile

	var lastPromise = filePaths.reduce((promise, filePath) => {					
		return promise.then(() => {			
			return doImport(filePath, configuration, taskInfo)
		})
	}, Promise.resolve())

	return lastPromise
}