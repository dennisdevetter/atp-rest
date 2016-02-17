var databaseContext = require('../../src/database').default
var testContext = require('./unittest-context')

export default function(root) {    
    if (!process.env.MONGO_URI) {
      throw Error('MONGO_URI environment variable is missing')
    }

    beforeEach(function(done) {
      testContext.runBeforeEach(root)
      connectToDatabase().then(done).catch(done)
    });

    afterEach(function() {    
       testContext.runAfterEach(root)
    });
}

function connectToDatabase(){
  return new Promise((resolve, reject) => {
    var connectionString = process.env.MONGO_URI
    
    databaseContext.configure({connectionString})         
         .then(dropDatabase)
         .then(resolve)
         .catch((error) => {
           console.log(`error connecting to the database with connectionString ${connectionString}`)
            reject(error)
         })
  })  
}

function dropDatabase(connection) {
  return new Promise((resolve, reject) => {
    try {
      connection.db.dropDatabase((err) => {
        if (!err) {
            resolve()
          } else {
            reject(err)
          }
      })      
    }    
    catch (error) {
      reject(error)
    }    
  })
}