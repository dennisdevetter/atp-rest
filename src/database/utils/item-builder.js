import itemUtils from './item-utils'

class ItemBuilder {

	constructor(options) {				
		this.methods = itemUtils(options)
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

ItemBuilder.create = function(options) {
	return new ItemBuilder(options)
}

export default ItemBuilder