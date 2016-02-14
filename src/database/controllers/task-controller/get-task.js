import TaskModel from '../../models/task-model'
import { validateRequiredArgument } from '../../../utils/argument-validation'

export default function getTask(taskId) {
	validateRequiredArgument({taskId})

	var options = { taskId }
	return TaskModel.findOne(options)
}
