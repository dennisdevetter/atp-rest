export default function indexHttpRequest(endpoint){
	return (req, res) =>  {
		res.send(`Hello! The API is at ${endpoint}`)
	}
} 