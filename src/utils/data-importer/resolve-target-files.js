import { validateRequiredArgument } from '../../utils/argument-validation'
import getFileMatches from './get-file-matches'

export default function resolveTargetFiles(configurations) {	
	validateRequiredArgument({ configurations })

	return new Promise((resolve, reject) => {
		var keys = Object.keys(configurations), targetFiles = [], index = 0

		function resolveIfFinished() {
			index++	
			if (index == keys.length) {
				resolve(targetFiles)			
			}
		}

		try {						
			keys.forEach((key) => {
				var configuration = configurations[key]								

				getFileMatches(configuration).then((result) => {										
					result && targetFiles.push(result)	
					resolveIfFinished()		
					
				}).catch((error) => {
					resolveIfFinished()
				})
				
			})							
		}
		catch(error) {
			reject(error)
		}
	})
}