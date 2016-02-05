export default  {
	api : {
		name: '/api',
		port: process.env.PORT || 8080,
	},
	database : {
		connectionString: 'mongodb://localhost:27017' 
	},
	secret: 'ilovescotchyscotch',
	importer: {
		sourcePath: ''
	}
};