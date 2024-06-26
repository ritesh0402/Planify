import bcrypt from 'bcrypt';
import UserModel from '../models/User'

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
         const isValid = await bcrypt.compare(password, user.password);
         if (isValid) {
            req.session.userId = user._id;
            return res.status(200).send("Login Successful!");
         }
      }
      return res.status(401).send("Invalid Username/Email or Password!")
   } catch (err) {
      console.error('Error checking existing user:', err);
      res.status(500).json({ error: 'Internal server error' });
   }
}

const userSignup = (req: any, res: any) => {
   const { username, email, phone, password } = req.body;
   const newUser = new UserModel({ username: username, password: password, email: email, phone: phone });
   newUser.save();
   req.session.userId = newUser._id;
   res.status(200).send("User Successfully Registered!");
}

const userLogout = (req: any, res: any) => {
   req.session.destroy((err: any) => {
      if (err) return res.status(403).send(err);
      return res.status(200).send("Successfully Logged out!");
   });

}

const userCheckAuth = (req: any, res: any) => {
   if (!req.session.userId) {
      return res.send(null);
   }
   return res.send(req.session.userId)
}

export default { userLogin, userLogout, userSignup, userCheckAuth }