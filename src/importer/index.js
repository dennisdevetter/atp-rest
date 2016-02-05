import importPlayers from './import-players';
import dataStore from '../database';
import config from '../config';

var options = {};

dataStore.configure(config.database).then(() => {
	importPlayers(options).then(() => {
		console.log('import players done');
	});			
});

