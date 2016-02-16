import handleTargetFile from './handle-target-file'
import { validateRequiredArgument } from '../../utils/argument-validation'

export default function handleAllTargetFiles(targetFiles){
	validateRequiredArgument({targetFiles})
	
	return (taskInfo) => {
		var lastPromise = targetFiles.reduce((promise, target) => {					
			return promise.then(() => handleTargetFile(target, taskInfo))
		}, Promise.resolve())

		return lastPromise
	}
}