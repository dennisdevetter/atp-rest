import mongoose from 'mongoose'

var Schema = mongoose.Schema

var playerSchema = new Schema({ 
    playerId: { type: Number, required: true}, 
    firstName : { type: String, required: true}, 
    lastName: { type: String, required: true}, 
    hand: { type: String, required: false}, 
    birthdate: { type: Number, required: false}, 
    country: { type: String, required: false},
    sex: { type: String, required: true},
    ranking: [ {
    	date : { type: Number, required: true },
    	points: { type: Number, required: false, default:0 },
    	tours: { type: Number, required: false, default:0 }
    } ]
})

export function getSchema(){
	return playerSchema
}

export function create(data) {
    return new PlayerModel(data)
}

var PlayerModel = mongoose.model('Player', playerSchema)
export default PlayerModel

