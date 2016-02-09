import morgan from 'morgan'

export default function logger(options) {
	return morgan('dev') 	
}