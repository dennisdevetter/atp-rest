import MatchModel from '../../models/match-model'
import logger from '../../../utils/logger'

export default function insertMatch(json) {

	var filter = { 
		tourneyId: json.tourneyId, 
		match: json.match 
	}

	return new Promise((resolve, reject) => {
	 	MatchModel.findOne(filter).then((model) => {	
	 		
			if (model) { 
				reject('item already exists')				
				return
			}  
			
			var newModel = MatchModel.create(json)

			newModel.save().then(() => {
				logger.log(`inserted match with tourney id ${newModel.tourneyId} and match number ${newModel.match}`)
				resolve(model)
			}).catch(reject)	
			
		}).catch(reject)  		
	})
}
