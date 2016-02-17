describe('importer', () => {    
	it('should start with options', () => {
		// arrange
		var generalConfiguration = require('../../config')
		var importerConfiguration = require('../configuration')
		var startImporter = require('../start-importer')

		var databaseConfigurationMock = { database: 'the database connection'}
		var importerConfigurationMock = { importer : 'bla'}

		var databaseConfigurationStub = root.sandbox.stub(generalConfiguration, 'getConfiguration').returns(databaseConfigurationMock)
		var importerConfigurationStub = root.sandbox.stub(importerConfiguration, 'getConfiguration').returns(importerConfigurationMock)
		var startImporterStub = root.sandbox.stub(startImporter, 'default')

		// act
		require('../index')
		
		// assert

		expect(startImporterStub).to.have.been.calledWith(databaseConfigurationMock, importerConfigurationMock)		
	})
})  