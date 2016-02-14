import Promise from 'bluebird'
import handleTargetFile from './handle-target-file'

export default function handleAllTargetFiles(targetFiles){
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