import MatchModel from '../../models/match-model'
import ItemBuilder from '../../utils/item-builder'

function filterMatch(json) {
	if (json.tourneyId && json.match) {						
			return { tourneyId: json.tourneyId, match: json.match }	
	}
	return null
}

function createBuilder() {
	var options = {
		dbModel: MatchModel,
		keySelector : filterMatch
	}
	
	return new ItemBuilder(options)
}

export default {
	createBuilder
}