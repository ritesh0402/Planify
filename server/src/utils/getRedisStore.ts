import { createClient } from 'redis'
import RedisStore from 'connect-redis'
import 'dotenv/config'

const getRedisStore = () => {
   const redisClient = createClient({
      password: process.env.REDIS_PASS,
      socket: {
         host: process.env.REDIS_URL,
         port: 10423
      }
   })

   redisClient.connect()

   redisClient.on('connect', () => {
      console.log("Connected to Redis Session Store")
   })

   redisClient.on('error', (error) => {
      console.log(error)
   })

   const redisStore = new RedisStore({
      client: redisClient,
      prefix: "planify:",
   })

   return redisStore;
}

export default getRedisStore;


