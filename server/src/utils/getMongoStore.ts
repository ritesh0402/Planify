import MongoStore from 'connect-mongo'
import 'dotenv/config'

const getMongoStore = () => {
   const mongoStore = MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      touchAfter: 24 * 60 * 60,
      crypto: { secret: 'codeword' }
   })

   mongoStore.on("error", function (err) {
      console.log(err)
   })

   return mongoStore
}


export default getMongoStore