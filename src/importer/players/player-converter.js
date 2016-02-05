 const playerConverter = (options) => (model, player) => {
		var { sex } = options;

		model.playerId = player.player_id;
		model.firstName =player.first_name;
		model.lastName =player.last_name;
		model.hand = player.hand;
		model.birthdate = player.birth_date;
		model.country = player.country_code;
		model.sex = sex;
 };

 export default playerConverter;