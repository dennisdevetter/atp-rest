
class ItemBuilder {

	constructor(methods) {		
		this.methods = methods
		this.builderList = []		
	}

	get(json) {			
		this._addToChain('get', json)		
		return this
	}

	query(json) {
		this._addToChain('query', json)		
		return this
	}

	save() {
		this._addToChain('save')		
		return this
	}

	toJson() {		
		this._addToChain('toJson')		
		return this
	}

	then(callback) {		
		var lastPromise = this.builderList.reduce((promise, item) => {					
   			return promise.then(item.promise)
  	}, Promise.resolve())

		return lastPromise.then(callback)
	}	

	_addToChain(key, parameters) {
		var method = this.methods[key]
		if (!method) {
			throw Error('missing method with key ' + key)
		}

		this.builderList.push({ promise: method(parameters) })
	}
}

ItemBuilder.create = function(methods) {
	return new ItemBuilder(methods)
}

export default ItemBuilder