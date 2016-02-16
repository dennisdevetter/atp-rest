import fileHelper from '../../utils/file-helper'
import { getConfiguration } from '../../config'
import { validateRequiredArgument } from '../../utils/argument-validation'

function getDataFolder() {
	var config = getConfiguration()
	return config.importer.sourcePath
}

export default function getFileMatches(configuration) {
	var { path } = configuration || {}
	validateRequiredArgument( { path })

	return new Promise((resolve, reject) => {
		try {			
			var dataFolder = getDataFolder()		

			fileHelper.getContentsOfFolder(dataFolder).then((files) => {
				var matches = files.filter((file) => file.match(path))
				matches.sort()
				matches.reverse()

				// return the absolute paths to the files.
				var filePaths = []
				matches.forEach((match) => {
					filePaths.push(dataFolder + match)
				})

				resolve({
					filePaths,
					configuration
				})
			}).catch(reject)			
		}
		catch (error) {
			reject(error)
		}
	})
}