export function runAsync(promise, success, failure) {
	return new Promise((resolve, reject) => {
		promise.then((result) => {				
			resolve(success(result));
		}).catch((error) => {
				let rejectResult = error;
				if (failure) {
					rejectResult = failure(error);
				}
				reject(rejectResult);
		});
	});
};