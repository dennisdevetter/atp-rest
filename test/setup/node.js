global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));

require('babel-core/register');
require('./setup')();

//allow stubbing of promises
//var sinonStubPromise = require('sinon-stub-promise');
//sinonStubPromise(sinon);

var Bluebird = require('bluebird');
require('sinon-as-promised')(Bluebird)