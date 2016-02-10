import rankingController from '../controllers/ranking-controller'

const schema = [
	'ranking_date', 
	'ranking', 
	'player_id', 
	'ranking_points', 
	'tours'	
]

var atp_player_rankings = {
	schema,
	path: 'atp_rankings_current.csv',
	onSave : rankingController.save
}

var wta_player_rankings = {
	schema,
	path: 'wta_rankings_current.csv',
	onSave : rankingController.save
}

export default {
	wta_player_rankings,
	atp_player_rankings
}