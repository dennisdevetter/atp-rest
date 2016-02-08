import MatchModel from '../../database/models/match-model';

const saveMatch = (jsonMatch)  => {

	return MatchModel.findOne({ tourneyId: jsonMatch.tourney_id, match: jsonMatch.match_num }).then((model) => {
			if (model){
				return;	
			}

			model = new MatchModel({});

			model.tourneyId = jsonMatch.tourney_id;
			model.tourneyName = jsonMatch.tourney_name;
			model.tourneyLevel = jsonMatch.tourney_level;			
			model.tourneyDate = jsonMatch.tourney_date;
			model.match = jsonMatch.match_num;
			model.surface = jsonMatch.surface;
			model.drawSize = jsonMatch.draw_size;
			model.winnerId = jsonMatch.winner_id;
			model.winnerIoc = jsonMatch.winner_ioc;
			model.loserId = jsonMatch.loser_id;
			model.loserIoc = jsonMatch.loser_ioc;
			model.score = jsonMatch.score;
			model.bestOf = jsonMatch.best_of;
			model.round = jsonMatch.round;
			model.minutes = jsonMatch.minutes;
			model.wAce = jsonMatch.w_ace;
			model.wDf = jsonMatch.w_df;
			model.wSvpt = jsonMatch.w_svpt;
			model.w1stIn = jsonMatch.w_1stIn;
			model.w1stWon = jsonMatch.w_1stWon;
			model.w2ndWon = jsonMatch.w_2ndWon;
			model.wSvGms = jsonMatch.w_SvGms;
			model.wBpSaved = jsonMatch.w_bpSaved;
			model.wBpFaced = jsonMatch.w_bpFaced;
			model.lAce = jsonMatch.l_ace;
			model.lDf = jsonMatch.l_df;
			model.lSvpt = jsonMatch.l_svpt;
			model.l1stIn = jsonMatch.l_1stIn;
			model.l1stWon = jsonMatch.l_1stWon;
			model.l2ndWon = jsonMatch.l_2ndWon;
			model.lSvGms = jsonMatch.l_SvGms;
			model.lBpSaved = jsonMatch.l_bpSaved;
			model.lBpFaced = jsonMatch.l_bpFaced;
						
			return model.save().then(() => {
				console.log(`saved match '${jsonMatch.tourney_id} ${jsonMatch.match_num}'`);
			});
		});  		
}

export default saveMatch;