import dataStore from '../database';
import config from '../config';
import importerConfiguration from './configuration';
import dataImporter from './data-importer';

dataStore.configure(config.database).then(() => {
	dataImporter(importerConfiguration);
});


