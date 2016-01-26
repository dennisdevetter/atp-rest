import {authenticate} from '../../../src/routes/auth';
import userModel from '../../../src/database/models/UserModel';

describe('calling the endpoint /authenticate', () => {  
  describe('passing an unknown user', () => {
    it('should return a failure response', () => {                          

        let json = sinon.spy();
        let findOneHandler = (filter, handler) => {
            
        };
      
        let request = {
          'body': { 
            'username': 'bla',
            'password': 'bla',
        }};
        let response = { json };

        sinon.stub(userModel, 'findOne', findOneHandler);

        let result = authenticate(request, response);
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