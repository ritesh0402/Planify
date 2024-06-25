import express from 'express'
import session from 'express-session'
import cors from 'cors'
import MongoStore from 'connect-mongo'
import helmet from 'helmet'
import connectToMongo from './utils/db'
import 'dotenv/config'

import authRouter from './routers/authRouter'

const PORT = process.env.PORT || 3000;
const app = express();

const store = MongoStore.create({
   mongoUrl: process.env.MONGO_URI,
   touchAfter: 24 * 60 * 60,
   crypto: { secret: 'codeword' }
})

store.on("error", function (err) {
   console.log('store error')
   console.log(err)
})


const sessionConfig = {
   resave: false,
   saveUninitialized: false,
   secret: process.env.SESSION_SECRET as string,
   cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax" as any,
      expires: new Date(Date.now() + (100 * 60 * 60 * 24 * 7)),
      maxAge: (100 * 60 * 60 * 24 * 7),
      httpOnly: true,
   },
   store
};

app.use(helmet());
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig))

app.use('/auth', authRouter)

app.listen(process.env.PORT, () => {
   connectToMongo();
   console.log(`Server listening on http://localhost:${PORT}`);
})
