import fileHelper from '../../utils/file-helper'
import config from '../../config'

function getDataFolder() {
	return config.importer.sourcePath
}

export default function getFileMatches(configuration) {

	var { path } = configuration

	return new Promise((resolve, reject) => {
		var dataFolder = getDataFolder()
		var filePath = dataFolder + path

		try {
			fileHelper.getContentsOfFolder(dataFolder).then((files) => {
				var matches = files.filter((file) => file.match(path)).sort().reverse()

				// return the absolute paths to the files.
				var filePaths = []
				matches.forEach((match) => {
					filePaths.push(dataFolder + match)
				})

				resolve({
					filePaths,
					configuration
				})
			})			
		}
		catch (error) {
			reject(error)
		}
	})
}