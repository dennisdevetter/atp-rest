import {index, authenticate} from '../../../src/routes/api';
import UserModel from '../../../src/database/models/UserModel';

describe('route /api', () => {
  describe('calling the endpoint /index', () => {
    it('should return a welcome message', () => {                  
      let json = sinon.spy();
      let result = index(null, { json });      
      expect(json.calledWith({ message: 'Welcome to the coolest API on earth!' })).to.be.ok;
    });
  });
});
