import express from 'express'
import session from 'express-session'
import https from 'https'
import cors from 'cors'
import MongoStore from 'connect-mongo'
import helmet from 'helmet'
import path from 'path'
import connectToMongo from './utils/db'
import 'dotenv/config'

const PORT = process.env.PORT || 3000;
const app = express();


app.use(helmet());
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));



app.listen(process.env.PORT, () => {
   connectToMongo();
   console.log(`Server listening on port: ${PORT}`);
})