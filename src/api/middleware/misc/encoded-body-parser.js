import bodyParser from 'body-parser'

export default function createEncodedBodyParser(options) {
	return bodyParser.urlencoded({ extended: false })
} 