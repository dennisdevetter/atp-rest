import dataStore from '../database';
import config from '../config';
import importerConfiguration from './configuration';
import dataImporter from './data-importer';


// wait for the database to connect and then import all the csv files
dataStore.configure(config.database).then(() => {
	dataImporter(importerConfiguration).then(() => {
		console.log('importer is done');
	});
});


