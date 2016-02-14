import PlayerModel from '../../models/player-model'

// todo refactor out the options parameter and apply it to the json itself

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
										
		return model.save()
	})  		
}

export default savePlayer