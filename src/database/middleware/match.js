import MatchModel from '../models/match-model'
import FluentPromise from '../../utils/fluent-promise'
import createActions from './actions'

function filterMatch(json) {
	if (json.tourneyId && json.match) {						
			return { tourneyId: json.tourneyId, match: json.match }	
	}
	return null
}

export default function create() {
	var options = {
		dbModel: MatchModel,
		keySelector : filterMatch
	}
	
	var matchActions = createActions(options)	
	
	return new FluentPromise(matchActions)
}
