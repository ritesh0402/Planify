import bcrypt from 'bcrypt';
import UserModel from '../models/User'
import jwt from 'jsonwebtoken';
import utilityFn from '../utils/utilityFn';
import { google } from 'googleapis'

const userLogin = async (req: any, res: any) => {
   const { username, password } = req.body;

   try {
      const isUsernameEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
      let user;
      if (isUsernameEmail) {
         user = await UserModel.findOne({ email: username });
      } else {
         user = await UserModel.findOne({ username: username });
      }

      if (user) {
         if (!user.isVerified) {
            return res.status(401).send({ status: "Failure", data: {}, error: "User is not verified.", msg: "Please check the verification email sent to you before trying to login." });
         }
         const isValid = await bcrypt.compare(password, user.password);
         if (isValid) {
            req.session.userId = user._id;
            return res.status(200).send({ status: "Success", data: { username: user.username, profile: user.profile, isAuthenticated: user.isVerified }, error: "", msg: "Login Successful!" });
         }
      }
      return res.status(401).send({ status: "Failure", data: {}, error: "Invalid Username/Email or Password!", msg: "Please enter valid Username/Password!" })
   } catch (err) {
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

const userSignup = async (req: any, res: any) => {

   try {
      const { username, email, phone, password } = req.body;
      const newUser = new UserModel({ username: username, password: password, email: email, phone: phone, isVerified: false });
      const emailStatus = await utilityFn.sendMail(email);
      if (!emailStatus) {
         return res.status(500).send({ status: "Failure", data: {}, error: "Try signing up again.", msg: "Internal Server Error!" })
      }
      await newUser.save();
      // req.session.userId = newUser._id;
      res.status(200).send({ status: "Success", data: { username: newUser.username, profile: newUser.profile, isAuthenticated: false }, error: "", msg: "Verify email to complete registration." });

   } catch (err) {
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

const userGoogleSignupLogin = async (req: any, res: any) => {

   try {
      const oauth2Client = new google.auth.OAuth2(
         process.env.GOOGLE_CLIENT_ID,
         process.env.GOOGLE_CLIENT_SECRET,
         process.env.GOOGLE_REDIRECT_URL
      );
      const code = req.query.code
      const { tokens } = await oauth2Client.getToken(code)

      const data = jwt.decode(tokens.id_token as string)
      const { email, profile = "" } = data as { email: string, profile: string }
      const parts = email.split('@');
      const username = parts[0]
      const phone = 0
      const password = parts[0] + '@password'

      const existingUser = await UserModel.findOne({ email: email })
      if (existingUser) {
         req.session.userId = existingUser._id;
         existingUser.isVerified = true;
         await existingUser.save()
         return res.redirect(`${process.env.REDIRECT_URL}?username=${existingUser.username}&profile=${existingUser.profile}&isAuthenticated=${existingUser.isVerified}`)
      }

      const newUser = new UserModel({ username: username, password: password, email: email, phone: phone, profile: profile, isVerified: true });
      const emailStatus = await utilityFn.sendMail(email);
      if (!emailStatus) {
         return res.status(500).send({ status: "Failure", data: {}, error: "Try signing up again.", msg: "Internal Server Error!" })
      }
      await newUser.save();
      req.session.userId = newUser._id;
      return res.redirect(`${process.env.REDIRECT_URL}?username=${newUser.username}&profile=${newUser.profile}&isAuthenticated=${newUser.isVerified}`)

   } catch (err) {
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }

}

const userLogout = (req: any, res: any) => {
   req.session.destroy((err: any) => {
      if (err) return res.status(403).send(err);
      return res.status(200).send({ status: "Success", data: {}, error: "", msg: "Successfully Logged out!" });
   });

}

const userCheckAuth = (req: any, res: any) => {
   if (!req.session.userId) {
      return res.status(404).send(null);
   }
   return res.status(200).send(req.session.userId)
}

const userEmailVerify = async (req: any, res: any) => {
   const token = req.params.token;
   let { email } = req.query;
   try {
      const decoded = jwt.verify(token as string, process.env.SESSION_SECRET as string) as { email: string };
      email = decoded.email
      const user = await UserModel.findOne({ email: email });

      if (!user) {
         return res.status(404).send({ status: "Failure", data: {}, error: `User ${email} not found`, msg: "Try signing up with another email." });
      }

      if (user.isVerified) {
         return res.status(200).send({ status: "Success", data: {}, error: "", msg: "Email is already verified." });
      }

      user.isVerified = true;
      await user.save();
      return res.status(200).send({ status: "Success", data: {}, error: "", msg: 'Email Successfully Verified!' }) // redirect to login page
   } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
         utilityFn.sendMail(email)
         console.log(email)
         return res.status(500).send({ status: "Failure", data: {}, error: err, msg: "New verification link has been sent to your email." });
      }
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

export default { userLogin, userLogout, userSignup, userCheckAuth, userEmailVerify, userGoogleSignupLogin }