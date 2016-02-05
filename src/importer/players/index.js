import playerConverter from './player-converter';
import PlayerModel from '../../database/models/player-model';

const schema = [
	'player_id', 
	'first_name', 
	'last_name', 
	'hand', 
	'birth_date', 
	'country_code'
];

const identifier = (player) => {
	return { playerId: player.player_id };
}

const onSave = (player) => {
	console.log(`saved player '${player.first_name} ${player.last_name}'`);
}

var atp_players = {
	schema,
	path: 'atp_players.csv',
	converter:  playerConverter({sex: 'M'}),	
	dataType: PlayerModel,	
	identifier,
	onSave
};

var wta_players = {
	schema,
	path: 'wta_players.csv',
	converter:  playerConverter({sex: 'F'}),	
	dataType: PlayerModel,	
	identifier,
	onSave
};


export default {
	wta_players,
	atp_players
}