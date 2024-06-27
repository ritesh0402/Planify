import mongoose from "mongoose";

const SubTaskSchema = new mongoose.Schema({
   subTaskTitle: { type: mongoose.Schema.Types.String, require: true },
   isDone: { type: mongoose.Schema.Types.Boolean, default: false, required: true },
   position: { type: mongoose.Schema.Types.Number, required: true },
   taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
   boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
}, {
   timestamps: true,
});


export default mongoose.model("SubTask", SubTaskSchema);