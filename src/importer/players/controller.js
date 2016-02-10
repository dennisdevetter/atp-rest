import PlayerModel from '../../database/models/player-model'

const savePlayer = (options) => (jsonPlayer) => {

	var { sex } = options

	return PlayerModel.findOne({ playerId: jsonPlayer.player_id }).then((model) => {
		if (model){
			return
		}

		model = PlayerModel.create({
			playerId : jsonPlayer.player_id,
			firstName: jsonPlayer.first_name,
			lastName: jsonPlayer.last_name,
			hand : jsonPlayer.hand,
			birthdate : jsonPlayer.birth_date,
			country : jsonPlayer.country_code,
			sex: sex
		})
								
		return model.save().then(() => {
			console.log(`saved player '${jsonPlayer.first_name} ${jsonPlayer.last_name}'`)
		})
	})  		
}

export default {
	save: savePlayer
}