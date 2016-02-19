import get from './get-item'
import toJson from './item-tojson'
import query from './query-item'
import save from './save-item'

export default function (options) {
	return {
			get : get(options),
			query : query(options),
			save: save(options), 
			toJson: toJson(options)
		}
}