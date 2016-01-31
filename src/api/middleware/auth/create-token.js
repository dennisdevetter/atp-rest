import tokenizer from '../../utils/tokenizer';

export default function createToken({app}) {
	return function (req, res){
		let { username, password } = req.login;

		let tokenExpireTimeOut = '1d';
		let tokenSecret = app.get('superSecret');			
		let token = tokenizer.create(`${username}+${password}`, tokenSecret, tokenExpireTimeOut);

		res.json({
			success: true,
			message: `Enjoy your token! it will be available for ${tokenExpireTimeOut}`,
			token: token 
		});
	}
}