function createRequest(username, password){
  return { body : { username, password }};
}

function createResponse() {
  return { json: sinon.spy() };
}

function findRoute(routes = [], endpoint){  
  let items = routes.filter((item) => item.endpoint === endpoint);  
  if (items.length == 1)  {
    return items[0];
  } 
  else if (items.lengt > 1)
  {
    throw Error('multiple routes with same endpoint');
  }
  return null;  
}

export default {
  createRequest,
  createResponse,
  findRoute
}