var api = require('../../../src/api').default; 
import controllers from '../../../src/api/controllers';
import middleware from '../../../src/api/middleware';

describe('The application',() => {     
  it('should start the server', () => {                            		
    // arrange  	
    var app = { 
        set: sinon.spy(),
        use : sinon.spy(), 
        get: sinon.spy(), 
        listen: sinon.spy() 
    };    
    var config = { 
        api : {
          name: 'the api', 
          port: 2000 
        },
        secret: 'the secret'        
    };    
    var options = { app, config };
    var endpoint = 'http://localhost:' + options.config.api.port + options.config.api.name;

    var middlewareRequestHandler = () => {};    
    var apiEndpointHandler = () => {};
    var requestPipes = { someMiddleware : middlewareRequestHandler};
    var routeControllers = ['controller1', 'controller2'];

    var createRequestPipeline = root.sandbox.stub(middleware, 'createRequestPipeline').returns(requestPipes);
    var createApiEndpoint = root.sandbox.stub(middleware, 'createApiEndpoint').returns(apiEndpointHandler);
    var createControllers = root.sandbox.stub(controllers, 'create').returns(routeControllers);
    
    // act
    api.start(options); 

    // assert    
    expect(app.set).to.have.been.calledWith('superSecret', config.secret);
    expect(app.use).to.have.been.calledWith(middlewareRequestHandler);
    expect(createRequestPipeline).to.have.been.calledWith({ app });    
    expect(createApiEndpoint).to.have.been.calledWith(endpoint);  
    expect(app.get).to.have.been.calledWith('/', apiEndpointHandler);

    expect(createControllers).to.have.been.calledWith({ app });      
    routeControllers.forEach((controller) => {
       expect(app.use).to.have.been.calledWith(config.api.name, controller);
    })    
    
    expect(app.listen).to.have.been.calledWith(config.api.port);
  });
});  

