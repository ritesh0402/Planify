import { NextFunction } from "express";
import User from "../models/User";
const { body, validationResult } = require('express-validator');

const updateUserReqValidator = [
   body('username', 'Username must not be empty. ').escape(),
   body('password', 'Password must be at least 8 characters long.').escape(),
   // body('phone', 'Phone number must be valid.').exists().notEmpty().isMobilePhone().escape(),
   async (req: any, res: any, next: NextFunction) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ status: "Failure", data: {}, error: errors.array()[0].msg, msg: "Request validation failed!" })
      }

      try {
         const user = await User.findOne({ _id: req.session.userId });
         if (!user) {
            return res.status(400).send({ status: "Failure", data: {}, error: "", msg: "User does not exist." });
         } else {
            next();
         }
      } catch (err) {
         res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
      }
   }
]

export default { updateUserReqValidator }