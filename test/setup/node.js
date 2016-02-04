global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));
global.rewire = require('rewire');

require('./setup')();

// allows testing of promises
var Bluebird = require('bluebird');
require('sinon-as-promised')(Bluebird)