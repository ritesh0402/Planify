import bcrypt from 'bcrypt';
import UserModel from '../models/User'
import jwt from 'jsonwebtoken';
import utilityFn from '../utils/utilityFn';

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
            return res.status(200).send({ status: "Success", data: { user: user.username }, error: "", msg: "Login Successful!" });
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
      req.session.userId = newUser._id;
      res.status(200).send({ status: "Success", data: { username: username, email: email }, error: "", msg: "Verify email to complete registration." });

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
   try {
      const decoded = jwt.verify(token as string, process.env.SESSION_SECRET as string) as { email: string };
      const email: string = decoded.email
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
   } catch (err) {
      console.error('Error verifying user email:', err);
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

export default { userLogin, userLogout, userSignup, userCheckAuth, userEmailVerify }