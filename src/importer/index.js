import dataStore from '../database'
import config from '../config'
import importerConfiguration from './configuration'
import dataImporter from './data-importer'

// use "npm run import force" if you want to skip 
// the modification date check and import always

dataStore.configure(config.database).then(() => {
	dataImporter(importerConfiguration)
})


