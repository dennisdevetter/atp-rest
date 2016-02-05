import PlayerModel from '../../../database/models/player-model';

export default function list(query){		
	// todo options
	let options = {};
	return PlayerModel.find(options).then((response) => {
		// todo convert response
		return response;
	});
}
