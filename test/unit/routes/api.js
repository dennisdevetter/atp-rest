import {index, authenticate} from '../../../src/routes/api';
import userModel from '../../../src/models/user';

describe('route /api', () => {
  describe('calling the endpoint /index', () => {
      it('should return a welcome message', () => {                  
        let json = sinon.spy();
        let result = index(null, { json });      
        expect(json.calledWith({ message: 'Welcome to the coolest API on earth!' })).to.be.ok;
      });
    });

  describe('calling the endpoint /authenticate', () => {  
    describe('passing an unknown user', () => {
      it('should return a failure response', () => {                          

          let json = sinon.spy();
          let findOneHandler = (filter, handler) => {
              
          };

          let app = {};
          let request = {
            'body': { 
              'username': 'bla',
              'password': 'bla',
          }};
          let response = { json };

          sinon.stub(userModel, 'findOne', findOneHandler);

          let result = authenticate(app, request, response);
          sinon.assert.calledOnce(userModel.findOne); 
      });
    });
    describe('passing an incorrect password', () => {
      it('should return a failure response', () => {                          
        
      });
    });
    describe('passing the correct username and password', () => {
      it('should return a success response together with the token', () => {                          
        
      });
    });
  });  
});
