import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   username: { type: String, required: true, trim: true },
   password: { type: String, required: true },
   email: { type: String, required: true, lowercase: true, trim: true },
   phone: { type: Number, required: true },
});

userSchema.virtual('url').get(function () {
   return `/${this.username}`;
});

export default mongoose.model("User", userSchema);