// set up test suite
global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));
global.expect = global.chai.expect;
var root = global    

// set up before and after hooks based on environment
var context = `../contexts/${process.env.NODE_ENV}-context`
require(context).default(root) 

// allows testing of promises
var Bluebird = require('bluebird');
require('sinon-as-promised')(Bluebird)