var startImporter = require('../start-importer')
var sut_startImporter = startImporter.default

export default function tests() {
	describe('start importer', () => {
		it('should throw an error when the database configuration is null', () => {                              	    
		    var databaseConfiguration = null
		    var importerConfiguration = 'config'
		  	expect(sut_startImporter.bind(startImporter, databaseConfiguration, importerConfiguration)).to.throw('database cannot be null')
		})

		it('should throw an error when the importer configuration is null', () => {                              	    
		    var databaseConfiguration = { database: 'bla' }
		    var importerConfiguration = null
		  	expect(sut_startImporter.bind(startImporter, databaseConfiguration, importerConfiguration)).to.throw('importerConfiguration cannot be null')
		})

		it('should start', (done) => {
			// arrange
			var datastore = require('../../database').default
			var dataImporter = require('../../utils/data-importer')
			var generalConfiguration = require('../../config')
			var importerConfiguration = require('../configuration')

			var databaseConfigurationMock = { database: 'the database connection'}
			var importerConfigurationMock = { importer : 'bla'}

			var configurePromise = Promise.resolve()
			var configureDataStoreStub = root.sandbox.stub(datastore, 'configure').returns(configurePromise)
			var dataImporterStub = root.sandbox.stub(dataImporter, 'default').returns(() => console.log('abc'))
			
			// act
			sut_startImporter(databaseConfigurationMock, importerConfigurationMock)

			// assert
			configurePromise.then(() => {		
				expect(configureDataStoreStub).to.have.been.calledWith(databaseConfigurationMock.database)
				expect(dataImporterStub).to.have.been.calledWith(importerConfigurationMock)	
				done()
			}).catch(done)
		})
	})
}