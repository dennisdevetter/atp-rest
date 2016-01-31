import jwt from 'jsonwebtoken';

export function create(payload, secret, expirationTime) {  
  let options = { expiresIn : expirationTime };
  let token = jwt.sign({payload: payload}, secret, options);
  return token;
}

export function verify(token, secret, callback){
	 jwt.verify(token, secret, callback);
}


const tokenizer = {
	create,
	verify
}

export default tokenizer;