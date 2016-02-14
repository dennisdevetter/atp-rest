import playersConfig from './players'
import rankingsConfig from './rankings'
import matchesConfig from './matches'

export function getConfiguration() {
	return Object.assign({}, 
		playersConfig,
		rankingsConfig,
		matchesConfig	
	)
}

export default getConfiguration()