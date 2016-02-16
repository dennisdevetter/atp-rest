import fs from 'fs'	
import cacheHelper from'../cache-helper'

var cacheKey = '$$FolderContent$$'

function getContentFromCache(path) {
	var cache = cacheHelper.get(cacheKey)	
	if (cache) {
		return cache[path]
	}
	return null
}

function addContentsToCache(path, contents){
	var cache = cacheHelper.get(cacheKey) 	
	if (!cache) {
		cache = {}
		cacheHelper.add(cacheKey, cache)
	}
	cache[path] = contents
}

export default function getContentsOfFolder(path) {	
	return new Promise((resolve, reject) => {

		var contents = getContentFromCache(path)
		if (contents){
			resolve(contents)
			return
		}
		
		fs.readdir(path, (err, files) => {
			if (err) {
				throw Error(err)
			}
			addContentsToCache(path, files)
			resolve(files)
		})
	})
}