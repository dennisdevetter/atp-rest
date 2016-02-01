var config = require('../../src/config').default;
var apiModule = require('../../src/api').default;
var dataStoreModule = require('../../src/database');
var systemUnderTest = require('../../src/server');

describe('The API REST server',() => {    
  it('should start', () => {                          
  		
  		var apiStub = root.sandbox.stub(apiModule, 'start');
  		var dataStoreStub = root.sandbox.stub(dataStoreModule, 'configureDatabase').resolves('foo')().then((value) => {
			//expect(dataStoreStub).to.have.been.calledWith(config.database);    

			
  		});

  		//systemUnderTest.startServer();
  });
});  




// // starts the rest api
// var api = require('./api').default;
// var config = require('./config').default;
// var dataStore = require('./database');
// var express = require('express');


// dataStore.configureDatabase(config.database).then(() => {
// 	console.log('database connection established, starting server...');
// 	var app = express();
// 	api.start({app, config});
// }).catch((error) => {
// 	console.log('Error connecting to the database. ' + error);
// 	// todo.. send email ??
// });
