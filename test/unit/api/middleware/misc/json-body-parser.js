import bodyParser from 'body-parser';

export default function(options) {
	return bodyParser.json();
}