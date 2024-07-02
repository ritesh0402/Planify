import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
   username: { type: String, required: true, trim: true },
   password: { type: String, required: true },
   email: { type: String, required: true, lowercase: true, trim: true, unique: true },
   phone: { type: Number, required: true },
   profile: { type: String, default: "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" },
   isVerified: { type: Boolean, default: false }
});

userSchema.pre('save', async function (next) {
   if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
   }
   next();
})

userSchema.pre('findOneAndUpdate', async function (next) {
   let update = { ...this.getUpdate() } as any;

   if (update.password) {
      const salt = await bcrypt.genSalt(12);
      update.password = await bcrypt.hash(update.password, salt);
      this.setUpdate(update);
   }
   next();
})

userSchema.post('findOneAndDelete', async function (user, next) {
   await mongoose.model('Board').deleteMany({ createrId: user._id })
   next();
})

userSchema.virtual('url').get(function () {
   return `/${this.username}`;
});

export default mongoose.model("User", userSchema);