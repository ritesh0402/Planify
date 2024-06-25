import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
   createrId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   boardTitle: { type: String, required: true }
}, {
   timestamps: true,
});

// boardSchema.virtual('url').get(function () {
//    return `/${this._id}`;
// });

export default mongoose.model("Board", boardSchema);