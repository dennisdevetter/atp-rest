export default function startImport(targetFiles) {	
	if (!targetFiles) {
		console.log('nothing to import')
		return
	}

	var task = {
		taskId: 'importfiles',
		task : handleAllTargetFiles(targetFiles)
	}
	
	taskRunner.startTask(task).then((taskModel) => {		
		var statusMessage = getStatusMessage(taskModel.status)
		var dateString = new Date(taskModel.lastExecutedOn)
		console.log(`task was executed on ${dateString} with status: ${statusMessage}`)
	})
}
