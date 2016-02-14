import systemUnderTest from '../tokenizer'
import jwt from 'jsonwebtoken'

export default function tests() {
	describe('tokenizer', () => {
		it('should create a token for a limited amount of time', () => {                          
			// arrange
			var payload = 'the payload2'
			var secret = 'the secre2t'
			var expirationTime = '2d'
			var signToken = root.sandbox.stub(jwt, 'sign').returns('the token')

			// avt
			var token = systemUnderTest.create(payload, secret, expirationTime)

			// assert
			expect(signToken).to.have.been.calledWith({payload: payload}, secret, { expiresIn : expirationTime })   
			expect(token).to.equal('the token')
		}) 

		it('should verify a token against the secret', () => {                          
			// arrange
			var token = 'abcdefg'
			var secret = 'some secret'
			var callback = () => {}
			var verifyToken = root.sandbox.stub(jwt, 'verify')

			// act
			systemUnderTest.verify(token, secret, callback)

			// assert
			expect(verifyToken).to.have.been.calledWith(token, secret, callback)
		}) 
	})
}