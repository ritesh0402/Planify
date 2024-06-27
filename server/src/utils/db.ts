import mongoose from "mongoose";
import 'dotenv/config'

const MONGO_URI: string | undefined = process.env.MONGO_URI;

const connectToMongo = () => {
   mongoose.connect(MONGO_URI!);

   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'MongoDb connection error:'));
   db.on('connected', () => {
      console.log('MongoDB connected');
   });
}

mongoose.set('strictQuery', false);
export default connectToMongo;