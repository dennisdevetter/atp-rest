import PlayerModel from '../../database/models/player-model';

const savePlayer = (options) => (jsonPlayer)  => {

	return PlayerModel.findOne({ playerId: jsonPlayer.player_id }).then((model) => {
		if (!model){
			model = new PlayerModel({});
		}
		
		var { sex } = options;

		model.playerId = jsonPlayer.player_id;
		model.firstName =jsonPlayer.first_name;
		model.lastName =jsonPlayer.last_name;
		model.hand = jsonPlayer.hand;
		model.birthdate = jsonPlayer.birth_date;
		model.country = jsonPlayer.country_code;
		model.sex = sex;

		return model.save().then(() => {
			console.log(`saved player '${jsonPlayer.first_name} ${jsonPlayer.last_name}'`);
		});
	});  		
}

export default savePlayer;