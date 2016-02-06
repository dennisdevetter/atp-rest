import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var scheduledTaskSchema = new Schema({     
    taskId: { type: String, required: true},
    lastExecutedOn: { type: Date, required: false},
    status: { type: Number, required: false, default:0}
});

export default mongoose.model('ScheduledTask', scheduledTaskSchema);

