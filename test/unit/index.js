import helloWorld from '../../src/index';

describe('helloWorld', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(helloWorld, 'greet');
      helloWorld.greet();
    });

    it('should have been run once', () => {
      expect(helloWorld.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(helloWorld.greet).to.have.always.returned('hello');
    });
  });
});
