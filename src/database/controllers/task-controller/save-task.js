import { validateRequiredArgument } from '../../../utils/argument-validation'

export default function saveTask(taskModel) {
	validateRequiredArgument({taskModel})
	// todo check if task model is a valid model
	// todo check update or insert

	return new Promise((resolve, reject) => {
		try {
			taskModel.save().then(() => {
				resolve(taskModel)
			}).catch(reject)
		} 
		catch(error) {
			reject(error)
		}	
	})	
}
