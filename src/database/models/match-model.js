import mongoose from 'mongoose'

var Schema = mongoose.Schema

var matchSchema = new Schema({ 
    tourneyId: { type: String, required: true}, 
    tourneyName: { type: String, required: true}, 
    tourneyLevel: { type: String, required: false}, 
    tourneyDate: { type: Number, required: true}, 
    match: { type: Number, required: true}, 
    surface: { type: String, required: false}, 
    drawSize: { type: Number, required: false}, 
    winnerId: { type: Number, required: true}, 
    winnerIoc: { type: String, required: true}, 
    loserId: { type: Number, required: true}, 
    loserIoc: { type: String, required: true}, 
    score: { type: String, required: false}, 
    bestOf: { type: Number, required: false}, 
    round: { type: String, required: false}, 
    minutes: { type: Number, required: false}, 
    wAce: { type: Number, required: false}, 
    wDf: { type: Number, required: false}, 
    wSvpt: { type: Number, required: false}, 
    w1stIn: { type: Number, required: false}, 
    w1stWon: { type: Number, required: false}, 
    w2ndWon: { type: Number, required: false}, 
    wSvGms: { type: Number, required: false}, 
    wBpSaved: { type: Number, required: false}, 
    wBpFaced: { type: Number, required: false}, 
    lAce: { type: Number, required: false}, 
    lDf: { type: Number, required: false}, 
    lSvpt: { type: Number, required: false}, 
    l1stIn: { type: Number, required: false}, 
    l1stWon: { type: Number, required: false}, 
    l2ndWon: { type: Number, required: false}, 
    lSvGms: { type: Number, required: false}, 
    lBpSaved: { type: Number, required: false}, 
    lBpFaced: { type: Number, required: false} 
})

export function getSchema(){
    return matchSchema
}

export default mongoose.model('Match', matchSchema)

