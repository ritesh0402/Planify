import { NextFunction } from "express";
import User from "../models/User";
const { body, validationResult } = require('express-validator');

const updateUserReqValidator = [
   body('username', 'Username must not be empty. ').exists().notEmpty().isLength({ min: 6, max: 64 }).escape(),
   body('password', 'Password must be at least 8 characters long.').exists().notEmpty().isLength({ min: 8, max: 32 }).escape(),
   body('phone', 'Phone number must be valid.').exists().notEmpty().isMobilePhone().escape(),
   body('profile').custom((value: string) => {
      const cloudinaryUrlPattern = /^https?:\/\/res\.cloudinary\.com\/.*$/;
      if (!cloudinaryUrlPattern.test(value)) {
         throw new Error('Profile must be a Cloudinary URL.');
      }
      return true;
   }),
   async (req: any, res: any, next: NextFunction) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ status: "Failure", data: {}, error: errors.array()[0].msg, msg: "Request validation failed!" })
      }

      try {
         const user = await User.findOne({ email: req.body.email });
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