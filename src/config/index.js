export function getConfiguration()  {
	return {
		api : {
			name: '/api',
			port: process.env.PORT || 8080,
		},
		database : {
			connectionString: 'mongodb://localhost:27017' 
		},
		secret: 'ilovescotchyscotch',
		importer: {
			sourcePath: 'C:\\github\\atp-rest\\data\\'
		}	
	}	
}

export default getConfiguration()