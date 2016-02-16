import handleAllTargetFiles from './handle-all-target-files'
import getStatusMessage from './status-message'
import logger from '../../utils/logger'
import taskRunner from '../task-runner'

export default function startImport(targetFiles) {	
	if (!targetFiles) {
		logger.log('nothing to import')
		return
	}

	var task = {
		taskId: 'importfiles',
		task : handleAllTargetFiles(targetFiles)
	}
	
	taskRunner.startTask(task).then((taskModel) => {		
		var statusMessage = getStatusMessage(taskModel.status)
		var dateString = new Date(taskModel.lastExecutedOn)
		logger.log(`task was executed on ${dateString} with status: ${statusMessage}`)
	})
}
