import fs from 'fs'	

export default function getContentsOfFolder(path) {
	var cache = {}
	return new Promise((resolve, reject) => {
		var contents = cache[path]
		if (contents){
			resolve(contents)
			return
		}

		// reads the directory content
		fs.readdir(path, (err, files) => {
			if (err) {
				throw Error(err)
			}
			cache[path] = files
			resolve(files)
		})
	})
}