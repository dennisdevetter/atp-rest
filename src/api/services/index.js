import users from './users'
import players from './players'

/* creates the service layer */
const userService = users()
const playerService = players()

export default {
	userService,
	playerService
}
