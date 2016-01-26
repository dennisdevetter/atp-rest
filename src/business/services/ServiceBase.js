import { runAsync } from '../../utils/async';

class ServiceBase {

	constructor(props = {}){
		this.converter = props.converter;
	}

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

	__handleResponse(response){
		if( Object.prototype.toString.call(response).toLowerCase() === '[object array]' ) {				
			return this._convertItems(response);
		}				
		return this._convertItem(response);
	}

	request(promise, onFetched) {
		return runAsync(promise, (response) => this.__handleResponse(response));
	}
}

export default ServiceBase;