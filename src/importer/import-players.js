import PlayerModel from '../database/models/player-model';
import readFile from './file-reader';
import Promise from 'bluebird';

const headers = [
	'player_id', 
	'first_name', 
	'last_name', 
	'hand', 
	'birth_date', 
	'country_code'
]

function deleteAllPlayers(){
	return PlayerModel.find({}).remove();			
}

export default function importPlayers(options){
	var failed = 0;
	var succeeded = 0;
	return new Promise((resolve, reject) => {
		try {		
			readFile('./data/wta_players.csv', headers).then((players) => {		
					function resolveIfFinished(){
						if (succeeded + failed == players.length) {
							resolve();
						}
					}

					if (players && players.length) {						
						players.forEach((player) => {
							savePlayer(player).then(() => {
								succeeded++;
								resolveIfFinished();
							}).catch((error) => {
								console.log('failed to save. error:' + error);
								failed++;
								resolveIfFinished();
							});						
						});								
					}							
				}).catch((error) => {
					reject(error);
				});		
		}
		catch(error) {
			reject(error);
		}
		
	});	
}

function savePlayer(player){  

  return PlayerModel.findOne({ playerId: player.player_id }).then((model) => {  		
  		var isNew;
  		if (!model){
			 model = new PlayerModel({});								
			 isNew = true;
  		}

  		model.playerId = player.player_id;
		model.firstName =player.first_name;
		model.lastName =player.last_name;
		model.hand = player.hand;
		model.birthdate = player.birth_date;
		model.country = player.country_code;
		model.sex = 'F';

		return model.save().then((result) => {				
			console.log(`saved player '${player.first_name} ${player.last_name}'`);
		});				  		
  });
}