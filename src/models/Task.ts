import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
   taskTitle: { type: String, required: true },
   description: String,
   coverColor: { type: mongoose.Schema.Types.String, default: 'gray', required: true },
   priority: { type: mongoose.Schema.Types.String, default: 'low', required: true },
   position: { type: mongoose.Schema.Types.Number, required: true },
   listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
   boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
}, {
   timestamps: true,
});

TaskSchema.post('findOneAndDelete', async function (task, next) {
   await mongoose.model('SubTask').deleteMany({ taskId: task._id });
   next()
})

TaskSchema.post('findOneAndUpdate', async function (task, next) {
   await mongoose.model('SubTask').updateMany({ taskId: task._id }, { listId: task.listId });
   next()
})
export default mongoose.model("Task", TaskSchema);