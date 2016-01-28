import decodeTokenMiddleware from './decode-token';

export default function middleware({ app }) {
  
  var decodeToken = decodeTokenMiddleware({ app });

  function configure({ router, routeTable }) {
    //applying middleware
    router.use((req, res, next) => {  
        let route = routeTable.getRouteByEndpoint(req.url);
        if (route && !route.isPublic) {
          decodeToken(req, res, next);  
        }
        else {
          // nothing to do here, continue to the next middleware
          next();
        }
    });
  }

  return {
      configure      
    }
}