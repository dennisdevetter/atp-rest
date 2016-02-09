import savePlayer from './save-player'

const schema = [
	'player_id', 
	'first_name', 
	'last_name', 
	'hand', 
	'birth_date', 
	'country_code'
]

var atp_players = {
	schema,
	path: 'atp_players.csv',
	onSave : savePlayer({sex: 'M'})
}

var wta_players = {
	schema,
	path: 'wta_players.csv',
	onSave : savePlayer({sex: 'F'})
}

export default {
	wta_players,
	atp_players
}