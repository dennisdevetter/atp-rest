import resolveTargetFiles from './resolve-target-files'
import startImport from './start-import'

export default function importer(configurations) {		
	resolveTargetFiles(configurations).then(startImport)
}
