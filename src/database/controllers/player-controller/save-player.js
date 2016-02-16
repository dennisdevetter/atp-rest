import PlayerModel from '../../models/player-model'
import logger from '../../../utils/logger'

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
										
		return model.save().then(() => {
			logger.log(`saved player with id ${jsonPlayer.player_id} and name ${jsonPlayer.first_name} ${jsonPlayer.last_name}`)
		})
	})  		
}

export default savePlayer