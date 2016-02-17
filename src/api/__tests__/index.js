var controllersModule = require('../controllers')
var middlewareModule = require('../middleware')

describe('api',() => {     
	describe ('start server', () => {		
		it('should start with options', () => {                            		
			// arrange  	
			var app = { 
			    set: sinon.spy(),
			    use : sinon.spy(), 
			    get: sinon.spy(), 
			    listen: sinon.spy() 
			}    
			var config = { 
			    api : {
			      name: 'the api', 
			      port: 2000 
			    },
			    secret: 'the secret'        
			}    
			var options = { app, config }
			var endpoint = 'http://localhost:' + options.config.api.port + options.config.api.name

			var middlewareRequestHandler = () => {}    
			var apiEndpointHandler = () => {}
			var requestPipes = { someMiddleware : middlewareRequestHandler}
			var routeControllers = ['controller1', 'controller2']

			var createRequestPipeline = root.sandbox.stub(middlewareModule, 'createRequestPipeline').returns(requestPipes)
			var createApiEndpoint = root.sandbox.stub(middlewareModule, 'createApiEndpoint').returns(apiEndpointHandler)
			var createControllers = root.sandbox.stub(controllersModule, 'createControllers').returns(routeControllers)

			// act
			var systemUnderTest = require('../../../src/api').default
			systemUnderTest.start(options) 

			// assert    
			expect(app.set).to.have.been.calledWith('superSecret', config.secret)
			expect(app.use).to.have.been.calledWith(middlewareRequestHandler)
			expect(createRequestPipeline).to.have.been.calledWith({ app })    
			expect(createApiEndpoint).to.have.been.calledWith(endpoint)  
			expect(app.get).to.have.been.calledWith('/', apiEndpointHandler)

			expect(createControllers).to.have.been.calledWith({ app })      
			routeControllers.forEach((controller) => {
			   expect(app.use).to.have.been.calledWith(config.api.name, controller)
			})    

			expect(app.listen).to.have.been.calledWith(config.api.port)
		})
	})
})  

 