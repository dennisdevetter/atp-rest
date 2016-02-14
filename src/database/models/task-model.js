import mongoose from 'mongoose'

var Schema = mongoose.Schema

var TaskModelSchema = new Schema({     
    taskId: { type: String, required: true},
    lastExecutedOn: { type: Date, required: false},
    status: { type: Number, required: false, default:0}
})

var TaskModel = mongoose.model('Task', TaskModelSchema)
TaskModel.create = (data) => new TaskModel(data)

export function getSchema(){
	return TaskModelSchema
}

export default TaskModel

