import rankingController from '../../database/controllers/ranking-controller'

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
	onSave : rankingController.saveRanking
}

var wta_player_rankings = {
	schema,
	path: 'wta_rankings_current.csv',
	onSave : rankingController.saveRanking
}

export default {
	wta_player_rankings,
	atp_player_rankings
}