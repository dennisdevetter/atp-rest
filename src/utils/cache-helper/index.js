// TODO: add sliding/absolute expiration

var cache = {}

function get(cacheKey){
	return cache[cacheKey]
}

function add(cacheKey, value) {
	cache[cacheKey] = value
}

function remove(cacheKey) {
	delete cache[cacheKey]
}

var cacheHelper = {
	get,
	add,
	remove
}

export function createCache(cacheInstance) {
	cache = cacheInstance
	return cacheHelper
}

export default cacheHelper

