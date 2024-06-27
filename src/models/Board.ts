import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
   creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   boardTitle: { type: String, required: true }
}, {
   timestamps: true,
});

boardSchema.virtual('url').get(function () {
   return `/board/${this._id}`;
});

boardSchema.post('findOneAndDelete', async function (board, next) {
   await mongoose.model('List').deleteMany({ boardId: board._id });
   await mongoose.model('Task').deleteMany({ boardId: board._id });
   await mongoose.model('Subtask').deleteMany({ boardId: board._id });
   next()
})

export default mongoose.model("Board", boardSchema);