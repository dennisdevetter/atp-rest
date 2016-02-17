import testStore from '../helpers/test-store'
import { runBeforeEach, runAfterEach } from './unittest-context'

export default function(root) {    
    root.testStore = testStore

    if (!process.env.MONGO_URI) {
      throw Error('MONGO_URI environment variable is missing')
    }

    before(function(done) {
       testStore.connectToDatabase().then(testStore.dropDatabase).then(done).catch(done)
    })

    beforeEach(function() {
      runBeforeEach(root)           
    });

    afterEach(function() {    
      runAfterEach(root)
    });

    after(function() {

    })
}

