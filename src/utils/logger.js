function log(info) {
	if (process.env.NODE_ENV !== 'test') {
		console.log(info)
	}
}

const logger = {
	log : log
}

export default logger