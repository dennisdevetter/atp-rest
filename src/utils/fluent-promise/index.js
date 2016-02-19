class FluentPromise {

	constructor(options) {				
		this.chainedPromisesList = []				
		this._connectFluentMethods(options)
	}

	then(resolveCallback) {		
		var lastPromise = this.chainedPromisesList.reduce((promise, item) => {					
   			return promise.then(item.promise)
  	}, Promise.resolve())

		return lastPromise.then(resolveCallback)
	}	

	_addToChain(promise) {
		promise && this.chainedPromisesList.push({ promise })
	}

	_connectFluentMethods(options) {
		Object.keys(options).forEach((key) => {
			var chainedPromiseFunction = options[key]			

			if (typeof(chainedPromiseFunction) === 'function') {				
				this[key] = (parameters) => {
					var promise = chainedPromiseFunction(parameters)
					this._addToChain(promise)					
					return this
				}				
			}
		})	
	}	
}

FluentPromise.create = function(options) {
	return new FluentPromise(options)
}

export default FluentPromise