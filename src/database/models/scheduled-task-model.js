import mongoose from 'mongoose'

var Schema = mongoose.Schema

var scheduledTaskSchema = new Schema({     
    taskId: { type: String, required: true},
    lastExecutedOn: { type: Date, required: false},
    status: { type: Number, required: false, default:0}
})

var ScheduledTaskModel = mongoose.model('ScheduledTask', scheduledTaskSchema)
export default ScheduledTaskModel

ScheduledTaskModel.create = (data) => new ScheduledTaskModel(data)

