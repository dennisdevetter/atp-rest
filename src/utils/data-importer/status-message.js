export default function getStatusMessage(status){
	switch(status) {		
		case 1:
			return 'succesfully'
		case 2:
			return 'failed'
		default:
			return '(not yet)'
	}
}