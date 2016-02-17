import dataStore from '../../src/database'

var currentConnection

function connectToDatabase() {
  return new Promise((resolve, reject) => {
    
    let connectionString = process.env.MONGO_URI

    dataStore.configure({connectionString})         
         .then((connection) => {
            currentConnection = connection
            resolve()
         })     
         .catch((error) => {
           console.log(`error connecting to the database with connectionString ${connectionString}`)
            reject(error)
         })
  })  
}

function dropDatabase(done) {
  let connection = currentConnection
  if (!connection) {
      throw Error('needs an active database connection')
  }

  return new Promise((resolve, reject) => {

    function success() {
      if (done) { 
        done() 
      } else {
       resolve()      
      }
    }
    function failure(error) {
      if (done) {
        done(error)
      } else {
        reject(error)
      }
    }

    try {     
      connection.db.dropDatabase((err) => {
        if (!err) {            
            success()
          } else {
            failure(err)
          }
      })      
    }    
    catch (error) {
      failure(error)
    }    
  })
}

const testStore = {
    connectToDatabase,
    dropDatabase
}

export default testStore