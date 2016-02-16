import handleTargetFile from './handle-target-file'
import { validateRequiredArgument } from '../../utils/argument-validation'

export default function handleAllTargetFiles(targetFiles){
	validateRequiredArgument({targetFiles})

	// the task info is given by the task runner on each run.
	// it gives information about tasks run in history.
	return (taskInfo) => {
		var lastPromise = targetFiles.reduce((promise, target) => {					
			return promise.then(() => {			
				return handleTargetFile(target, taskInfo)
			})
		}, Promise.resolve())

		return lastPromise
	}
}