import { runAsync } from '../../utils/async';

class Service {

	constructor(props = {}){
		this.converter = props.converter;
	}

	// public methods
	request(promise, onFetched) {
		return runAsync(promise, (response) => this.__handleResponse(response));
	}

	// protected methods
	_convertItem(item){
		return item && this.converter.convertFrom(item);
	}

	_convertItems(items){
		var list = [];
		for (var i =  0; i < items.length; i++) {
			let item = this._convertItem(items[i]);
			item && list.push(item);
		};
		return list;
	}

	// private methods
	__handleResponse(response){
		if( Object.prototype.toString.call(response).toLowerCase() === '[object array]' ) {				
			return this._convertItems(response);
		}				
		return this._convertItem(response);
	}
}

export default Service;