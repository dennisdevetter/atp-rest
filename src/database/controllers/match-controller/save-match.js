import MatchModel from '../../models/match-model'

const saveMatch = (jsonMatch)  => {

	var filter = { 
		tourneyId: jsonMatch.tourney_id, 
		match: jsonMatch.match_num 
	}

	return MatchModel.findOne(filter).then((model) => {
		if (model){
			return	
		}

		model = MatchModel.create({
			tourneyId: jsonMatch.tourney_id,
			tourneyName: jsonMatch.tourney_name,
			tourneyLevel: jsonMatch.tourney_level,			
			tourneyDate: jsonMatch.tourney_date,
			match: jsonMatch.match_num,
			surface: jsonMatch.surface,
			drawSize: jsonMatch.draw_size,
			winnerId: jsonMatch.winner_id,
			winnerIoc: jsonMatch.winner_ioc,
			loserId: jsonMatch.loser_id,
			loserIoc: jsonMatch.loser_ioc,
			score: jsonMatch.score,
			bestOf: jsonMatch.best_of,
			round: jsonMatch.round,
			minutes: jsonMatch.minutes,
			wAce: jsonMatch.w_ace,
			wDf: jsonMatch.w_df,
			wSvpt: jsonMatch.w_svpt,
			w1stIn: jsonMatch.w_1stIn,
			w1stWon: jsonMatch.w_1stWon,
			w2ndWon: jsonMatch.w_2ndWon,
			wSvGms: jsonMatch.w_SvGms,
			wBpSaved: jsonMatch.w_bpSaved,
			wBpFaced: jsonMatch.w_bpFaced,
			lAce: jsonMatch.l_ace,
			lDf: jsonMatch.l_df,
			lSvpt: jsonMatch.l_svpt,
			l1stIn: jsonMatch.l_1stIn,
			l1stWon: jsonMatch.l_1stWon,
			l2ndWon: jsonMatch.l_2ndWon,
			lSvGms: jsonMatch.l_SvGms,
			lBpSaved: jsonMatch.l_bpSaved,
			lBpFaced: jsonMatch.l_bpFaced
		})

		return model.save()
	})  		
}

export default saveMatch