import { runAsync } from '../../utils/async';

class ServiceBase {

	constructor(props = {}){
		this.converter = props.converter;
	}

	callApi(promise, onFetched) {
			return runAsync(promise, (model) => {
				if (onFetched)
				{
					return onFetched(model);
				}
				// TODO: check if the model is a single instance or an array
				// if its an array iterate and create entities for it to return.
				return model && this.converter.convertFrom(model);
			});
	}
}

export default ServiceBase;