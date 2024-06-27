import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
   username: { type: String, required: true, trim: true },
   password: { type: String, required: true },
   email: { type: String, required: true, lowercase: true, trim: true },
   phone: { type: Number, required: true },
});

userSchema.pre('save', async function (next) {
   if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
   }
   next();
})

userSchema.virtual('url').get(function () {
   return `/${this.username}`;
});

export default mongoose.model("User", userSchema);