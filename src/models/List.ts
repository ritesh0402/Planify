import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
   listTitle: { type: String, required: true },
   boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
   position: { type: mongoose.Schema.Types.Number, required: true },
   coverColor: { type: mongoose.Schema.Types.String, required: true, default: 'gray' },
}, {
   timestamps: true,
});

listSchema.post('findOneAndDelete', async function (list, next) {
   await mongoose.model('Task').deleteMany({ listId: list._id });
   next()
})

export default mongoose.model("List", listSchema);