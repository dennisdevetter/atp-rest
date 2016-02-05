import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var playerSchema = new Schema({ 
    playerId: { type: Number, required: true}, 
    firstName : { type: String, required: true}, 
    lastName: { type: String, required: true}, 
    hand: { type: String, required: false}, 
    birthdate: { type: Number, required: false}, 
    country: { type: String, required: true},
    sex: { type: String, required: true}
});

export function getSchema(){
	return playerSchema;
}

export default mongoose.model('Player', playerSchema);

