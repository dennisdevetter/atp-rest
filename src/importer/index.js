import { getConfiguration as getGeneralConfiguration } from '../config'
import { getConfiguration as getImporterConfiguration } from './configuration'
import startImporter from './start-importer'

var generalConfiguration = getGeneralConfiguration()
var importerConfiguration = getImporterConfiguration()
startImporter(generalConfiguration, importerConfiguration)