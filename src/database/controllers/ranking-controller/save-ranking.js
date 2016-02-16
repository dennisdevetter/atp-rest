import PlayerModel from '../../models/player-model'
import logger from '../../../utils/logger'

const saveRankings = (json)  => {
	
	return PlayerModel.findOne({ playerId: json.player_id }).then((model) => {		
		if (!model) {
			return		
		}

		if (!model.ranking) {
			model.ranking = []
		}

		var ranking = model.ranking.find((item) => item.date == json.ranking_date)		
		if (ranking) {			
			return			
		}
		
		model.ranking.push({
			date: json.ranking_date,
			points: json.ranking_points,
			tours : json.tours
		})

		return model.save().then(() => {
			logger.log(`saved ranking with date ${json.ranking_date} and points ${json.ranking_points}`)
		})
	})  		
}

export default saveRankings