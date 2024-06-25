import mongoose from "mongoose";

const SubTaskSchema = new mongoose.Schema({
   createrId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   boardTitle: { type: String, required: true }
}, {
   timestamps: true,
});


export default mongoose.model("SubTask", SubTaskSchema);