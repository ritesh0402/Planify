import { NextFunction } from "express";
import User from "../models/User";
const { body, validationResult } = require('express-validator');

const signupReqValidator = async (req: any, res: any, next: NextFunction) => {
   if (!req.body.username || !req.body.password || !req.body.email || !req.body.phone) {
      return res.status(400).json({ error: 'Missing required fields (username, password, email, phone)' });
   }

   body('username', 'Username must bot be empty. ').isLength({ min: 6, max: 64 });
   body('password', 'Password must be at least 8 characters long.').isLength({ min: 8, max: 32 });
   body('email', 'Must be a valid email address. ').isEmail();
   body('phone', 'Phone number must be valid.').isMobilePhone();

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.send({ error: errors.array({ onlyFirstError: true })[0].msg })
   }

   try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
         return res.status(400).json({ error: "An account with this email address already exists." });
      } else {
         next();
      }
   } catch (err) {
      console.error('Error checking existing user:', err);
      res.status(500).json({ error: 'Internal server error' });
   }
}

const loginReqValidator = (req: any, res: any, next: NextFunction) => {
   if (!req.body.username || !req.body.password) {
      return res.status(400).json({ error: 'Missing required fields (username/email, password)' });
   }

   const isUsernameEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.username);
   if (isUsernameEmail) {
      body('email', 'Must be a valid email address. ').isEmail();
   } else {
      body('username', 'Username must bot be empty. ').isLength({ min: 6, max: 64 });
   }
   body('password', 'Password must be at least 8 characters long.').isLength({ min: 8, max: 32 });

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).send({ error: errors.array[0].msg })
   }

   next();
}

export default { signupReqValidator, loginReqValidator }