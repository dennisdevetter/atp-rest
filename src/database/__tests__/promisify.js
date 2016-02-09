import mongoose from 'mongoose'
import Promise from 'bluebird'
import systemUnderTest from '../promisify'

describe('mongoose database promises',() => {    
  it('should initialize promises for mongoose database queries', () => {                          
    
    	var options = 'options'       
		systemUnderTest(options)

    	//expect(mongoose.Promise).to.equal(Promise)		
  })	
})  
