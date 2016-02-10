import PlayerModel from '../../database/models/player-model'

const saveRankings = (json)  => {
	
	return PlayerModel.findOne({ playerId: json.player_id }).then((model) => {		
		if (!model) return		

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

		return model.save()
	})  		
}

export default {
	save: saveRankings
}