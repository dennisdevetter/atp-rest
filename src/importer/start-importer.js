import dataStore from '../database'
import dataImporter from '../utils/data-importer'
import { validateRequiredArgument } from '../utils/argument-validation'

export default function startImporter(generalConfiguration, importerConfiguration) {	
	var { database } = generalConfiguration || {}
	
	validateRequiredArgument({ database, importerConfiguration })
	
	dataStore.configure(database).then(() => {		
		dataImporter(importerConfiguration)
	})
}