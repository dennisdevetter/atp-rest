import matchController from '../../database/controllers/match-controller'

const schema = [
	'tourney_id',
	'tourney_name',
	'surface',
	'draw_size',
	'tourney_level',
	'tourney_date',
	'match_num',
	'winner_id',
	'winner_seed',
	'winner_entry',
	'winner_name',
	'winner_hand',
	'winner_ht',
	'winner_ioc',
	'winner_age',
	'winner_rank',
	'winner_rank_points',
	'loser_id',
	'loser_seed',
	'loser_entry',
	'loser_name',
	'loser_hand',
	'loser_ht',
	'loser_ioc',
	'loser_age',
	'loser_rank',
	'loser_rank_points',
	'score',
	'best_of',
	'round',
	'minutes',
	'w_ace',
	'w_df',
	'w_svpt',
	'w_1stIn',
	'w_1stWon',
	'w_2ndWon',
	'w_SvGms',
	'w_bpSaved',
	'w_bpFaced',
	'l_ace',
	'l_df',
	'l_svpt',
	'l_1stIn',
	'l_1stWon',
	'l_2ndWon',
	'l_SvGms',
	'l_bpSaved',
	'l_bpFaced'
]

var matches = {
	schema,
	path: '(atp|wta)_matches_\\d{4}.csv',
	onSave : saveMatch,
	firstLineContainsHeader : true
}

function saveMatch(json) {
	var dataModel = convertToDataModel(json)
	return matchController.saveMatch(dataModel)
}

function convertToDataModel(json) {
	return {
		tourneyId: json.tourney_id,
		tourneyName: json.tourney_name,
		tourneyLevel: json.tourney_level,			
		tourneyDate: json.tourney_date,
		match: json.match_num,
		surface: json.surface,
		drawSize: json.draw_size,
		winnerId: json.winner_id,
		winnerIoc: json.winner_ioc,
		loserId: json.loser_id,
		loserIoc: json.loser_ioc,
		score: json.score,
		bestOf: json.best_of,
		round: json.round,
		minutes: json.minutes,
		wAce: json.w_ace,
		wDf: json.w_df,
		wSvpt: json.w_svpt,
		w1stIn: json.w_1stIn,
		w1stWon: json.w_1stWon,
		w2ndWon: json.w_2ndWon,
		wSvGms: json.w_SvGms,
		wBpSaved: json.w_bpSaved,
		wBpFaced: json.w_bpFaced,
		lAce: json.l_ace,
		lDf: json.l_df,
		lSvpt: json.l_svpt,
		l1stIn: json.l_1stIn,
		l1stWon: json.l_1stWon,
		l2ndWon: json.l_2ndWon,
		lSvGms: json.l_SvGms,
		lBpSaved: json.l_bpSaved,
		lBpFaced: json.l_bpFaced
	}
}

export default {
	matches
}