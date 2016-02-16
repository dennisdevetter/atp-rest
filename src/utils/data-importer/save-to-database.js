import { validateRequiredArgument } from '../../utils/argument-validation'
import logger from '../../utils/logger'

export default function saveToDatabase(items = [], options = {}) {		
	var { saveItem } = options || {}
	validateRequiredArgument({ saveItem })

	var failed = 0, succeeded = 0		
	return new Promise((resolve, reject) => {
		try {
			items.forEach((item) => {		
				saveItem(item).then(() => {
					succeeded++
					resolveIfFinished()
				}).catch((error) => {
					logger.log('failed to save. error:' + error)
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
				logger.log('import done.')				
				resolve({
					succeeded,
					failed
				})
			}
		}
	})
}