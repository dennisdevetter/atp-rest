function createResolvedPromise(resolvedValue) {
	return new Promise((resolve, reject) => resolve(resolvedValue))	
}

function createRejectedPromise(error) {
	return new Promise((resolve, reject) => reject(error))		
}


export default {
	createResolvedPromise,
	createRejectedPromise
}