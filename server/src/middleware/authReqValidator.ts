import { NextFunction } from "express";
import User from "../models/User";
const { param, body, validationResult } = require('express-validator');

const signupReqValidator = [
   body('username', 'Username must not be empty. ').exists().notEmpty().isLength({ min: 6, max: 64 }).escape(),
   body('password', 'Password must be at least 8 characters long.').exists().notEmpty().isLength({ min: 8, max: 32 }).escape(),
   body('email', 'Must be a valid email address. ').exists().notEmpty().isEmail().escape(),
   body('phone', 'Phone number must be valid.').exists().notEmpty().isMobilePhone().escape(),
   // body('profile').custom((value: string) => {
   //    const cloudinaryUrlPattern = /^https?:\/\/res\.cloudinary\.com\/.*$/;
   //    if (!cloudinaryUrlPattern.test(value)) {
   //       throw new Error('Profile must be a Cloudinary URL.');
   //    }
   //    return true;
   // }),
   async (req: any, res: any, next: NextFunction) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ status: "Failure", data: {}, error: errors.array()[0].msg, msg: "Request validation failed!" })
      }

      try {
         const user = await User.findOne({
            $or: [
               { email: req.body.email },
               { username: req.body.username }
            ]
         });
         if (user) {
            return res.status(400).send({ status: "Failure", data: {}, error: "", msg: "An account with this email address or username already exists." });
         } else {
            next();
         }
      } catch (err) {
         console.error('Error checking existing user:', err);
         res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
      }
   }]

const loginReqValidator = [
   body('username', 'Username must bot be empty. ').exists().notEmpty().isLength({ min: 6, max: 64 }).escape(),
   body('password', 'Password must be at least 8 characters long.').exists().notEmpty().isLength({ min: 8, max: 32 }).escape(),
   (req: any, res: any, next: NextFunction) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ status: "Failure", data: {}, error: errors.array()[0].msg, msg: "Request validation failed!" })
      }

      next();
   }]


const userEmailVerifyReqValidator = [
   param('token', 'Invalid verification link.').exists().notEmpty(),
   (req: any, res: any, next: NextFunction) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ status: "Failure", data: {}, error: errors.array()[0].msg, msg: "Request validation failed!" })
      }

      next();
   }]

export default { signupReqValidator, loginReqValidator, userEmailVerifyReqValidator }