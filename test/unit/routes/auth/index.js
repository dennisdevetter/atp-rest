import routes from '../../../../src/routes/auth-routes';
import userModel from '../../../../src/database/models/user-model';
import services from '../../../../src/business/services';
import tokenizer from '../../../../src/utils/tokenizer';
import helper from '../helper';

describe('auth routes',() => {
  // =======================================
  // initialize stubs + tests 
  // =======================================
  var app = { get : (value) => 'secret' };  

  var routeArray = routes({app});      
  tokenizer.create = (a) => 'the token';        
  
  // =======================================    
  // test setup
  // =======================================
  it('should contain all the routes', () => {                          
     expect(routeArray).to.not.be.empty;
     expect(routeArray.length).to.equal(1);
  });

  describe('authentication route', () => {  
    var authenticateRoute = helper.findRoute(routeArray, '/authenticate');

    it('should not be empty', () => {                               
      expect(authenticateRoute).to.not.be.empty;     
    });

    it('should allow only POST method', () => {                               
      expect(authenticateRoute.method).to.be.equal('POST');
    });

    it('should be a public route', () => {                               
      expect(authenticateRoute.isPublic).to.be.equal(true);
    });  

    it('should contain a route handler', () => {                               
      expect(authenticateRoute.handler).to.not.be.empty;     
      expect(authenticateRoute.handler).to.be.instanceof(Function);
    });  

    describe('calling endpoint', () => {        
      var request, response;

      beforeEach(()=>{        
        request = helper.createRequest('username', 'password');
        response = helper.createResponse();
      });

      it('should return response when not authenticated', (done) => {      
        let authenticated = false, message = 'failed';               
        let result = { authenticated, message};
        
        var serviceStub = root.sandbox.stub(services.userService, 'authenticate').resolves(result);
        authenticateRoute.handler(request, response); 
        
        serviceStub().then((value) => {
          expect(value).to.equal(result);    
          sinon.assert.calledWith(response.json, { success: false, message });          
          done();                         
        });
      });  

      it('should return token when authenticated', (done) => {                     
        let authenticated = true, message = '';                       
        let token = 'the token';
        let result = { authenticated, message};
        
        var serviceStub = root.sandbox.stub(services.userService, 'authenticate').resolves(result);
        authenticateRoute.handler(request, response); 
        
        serviceStub().then((value) => {
          expect(value).to.equal(result);    
          sinon.assert.calledWith(response.json, { 
            success: true,
            message: 'Enjoy your token! it will be available for 1d',
            token });
          done();                 
        });       
      });  

      it('should handle error', (done) => {                               
        let authenticated = true, message = '', errorMessage = 'something went wrong';   
        
        var serviceStub = root.sandbox.stub(services.userService, 'authenticate').rejects(errorMessage);        
        authenticateRoute.handler(request, response);         
        
        serviceStub().catch((error) => {          
          expect(error).to.deep.equal(new Error(errorMessage)); 
          sinon.assert.calledWith(response.json, {
            success: false,
            message: `An error occurred: '${error}'`
          });
          done();
        }); 
      }); 

    });   
  }); 
});  