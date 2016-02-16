import doImport from './do-import'
import { validateRequiredArgument } from '../../utils/argument-validation'

export default function handleTargetFile(targetFile, taskInfo) {
	var { filePaths, configuration } = targetFile || {}
	validateRequiredArgument({ filePaths, configuration, taskInfo })

	var lastPromise = filePaths.reduce((promise, filePath) => {					
		return promise.then(() => {			
			return doImport(filePath, configuration, taskInfo)
		})
	}, Promise.resolve())

	return lastPromise
}