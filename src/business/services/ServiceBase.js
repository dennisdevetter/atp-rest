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
				return model && this.converter.convertFrom(model);
			});
	}
}

export default ServiceBase;