import config from '../../src/config';

describe('config', () => {
  describe('return value', () => {

    it('should have a value for secret', () => {
      expect(config.secret).to.not.be.empty;
    });

    it('should have a value for database', () => {
      expect(config.database).to.not.be.empty;
    });
  });
});
