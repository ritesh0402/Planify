import express from 'express'
import session from 'express-session'
import cors from 'cors'
import helmet from 'helmet'
import connectToMongo from './utils/db'
// import getRedisStore from './utils/getRedisStore'
import getMongoStore from './utils/getMongoStore'
import 'dotenv/config'

import authRouter from './routers/authRouter'
import boardRouter from './routers/boardRouter'
import listRouter from './routers/listRouter'
import taskRouter from './routers/taskRouter'
import userRouter from './routers/userRouter'

const PORT = process.env.PORT || 3000;
const app = express();

const mongoStore = getMongoStore();
// const redisStore = getRedisStore();

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
   // store: redisStore
   store: mongoStore
};

app.use(helmet());
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig))

app.use('/auth', authRouter);
app.use('/api', boardRouter);
app.use('/api/user', userRouter);
app.use('/api/lists', listRouter);
app.use('/api/tasks', taskRouter);

connectToMongo();

app.listen(process.env.PORT, () => {
   console.log(`Server listening on http://localhost:${PORT}`);
})

