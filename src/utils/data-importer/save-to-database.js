import Promise from 'bluebird'

export default function saveToDatabase(items, options) {
	var { onSave } = options
	var failed = 0, succeeded = 0		

	return new Promise((resolve, reject) => {
		if (!onSave) {
			reject('onSave is not defined')
			return
		}

		function resolveIfFinished(){
			if (succeeded + failed == items.length) {
				console.log('import done.')
				// todo: add the success and failed count for the individual items
				// so that it can be taken into account for the task runner
				resolve()
			}
		}

		if (items && items.length) {					
			items.forEach((item) => {					
				onSave(item).then(() => {
					succeeded++
					resolveIfFinished()
				}).catch((error) => {
					console.log('failed to save. error:' + error)
					failed++
					resolveIfFinished()
				})						
			})								
		}
	})
}