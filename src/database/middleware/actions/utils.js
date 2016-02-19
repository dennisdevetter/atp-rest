import { validateRequiredArgument } from '../../../utils/argument-validation'

export function assignNewJsonValue(model, json = {}) {
		var value = model ? Object.assign({ id: model._id }, json) : null
		return value
	}
