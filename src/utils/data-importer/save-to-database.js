import { validateRequiredArgument } from '../../utils/argument-validation'

export default function saveToDatabase(items, saveItem) {	
	validateRequiredArgument({ saveItem })

	var failed = 0, succeeded = 0		
	return new Promise((resolve, reject) => {
		try {
			items && items.length && items.forEach((item) => {					
				saveItem(item).then(() => {
					succeeded++
					resolveIfFinished()
				}).catch((error) => {
					console.log('failed to save. error:' + error)
					failed++
					resolveIfFinished()
				})						
			})			
		} 
		catch(error) {
			reject(error)
		}

		function resolveIfFinished(){
			if (succeeded + failed == items.length) {
				console.log('import done.')
				// todo: add the success and failed count for the individual items
				// so that it can be taken into account for the task runner
				resolve()
			}
		}
	})
}