import MatchModel from '../../models/match-model'
import logger from '../../../utils/logger'

export default function saveMatch(json) {

	var filter = { 
		tourneyId: json.tourneyId, 
		match: json.match
	}

	return new Promise((resolve, reject) => {
	 	MatchModel.findOne(filter).then((model) => {		

			if (!model) {
				model = MatchModel.create(json)
			} else {
				Object.assign(model, json)	
			}
			
			model.save().then(() => {
				logger.log(`saved match with tourney id ${model.tourneyId} and match number ${model.match}`)
				resolve(model)
			}).catch(reject)	
			
		}).catch(reject)  		
	})
}

