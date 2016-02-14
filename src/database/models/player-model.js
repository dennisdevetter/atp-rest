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

var PlayerModel = mongoose.model('Player', playerSchema)
PlayerModel.create = (data) => new PlayerModel(data)

export function getSchema(){
    return playerSchema
}

export default PlayerModel




