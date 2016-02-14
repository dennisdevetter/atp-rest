export default function tests() {
	describe('models', () => {
		require('./user-model').default()
		require('./task-model').default()
		require('./player-model').default()
		require('./match-model').default()		
	})	
}