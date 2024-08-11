import UserModel from '../models/User'
import cloudinary from 'cloudinary';
import 'dotenv/config'
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.v2.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

const userUpdate = async (req: any, res: any) => {
   try {
      const userId = req.session.userId;
      const newData: any = {};
      if (req.body.profile) {
         newData.profile = req.body.profile;
      }
      if (req.body.username !== "") {
         newData.username = req.body.username;
         const duplicateUsername = await UserModel.find({ username: req.body.username })

         if (duplicateUsername.length > 0 && duplicateUsername[0]._id !== req.session.userId) {
            return res.status(400).send({ status: "Failure", data: {}, error: "Mongo error", msg: "Username already taken!" });
         }
      }
      if (req.body.password !== "") {
         newData.password = req.body.password;
      }

      let updatedUser;
      try {
         updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId },
            newData,
            { new: true }
         );

      } catch (error) {
         console.log(error)
      }

      if (!updatedUser) {
         return res.status(404).send({ status: "Failure", data: {}, error: "Mongo error", msg: "User not updated!" });
      }

      return res.status(200).send({ status: "Success", data: updatedUser, error: "", msg: "User successfully updated." });

   } catch (err) {
      console.log(err)
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

const userDelete = async (req: any, res: any) => {
   try {
      const userId = req.params.userId

      const deletedUser = await UserModel.findOneAndDelete({ _id: userId })
      if (!deletedUser) {
         return res.status(404).send({ status: "Failure", data: {}, error: "User not found!", msg: "Something went wrong." });
      }
      res.status(200).send({ status: "Success", data: { deletedUser }, error: "", msg: "User successfully deleted." });
   } catch (err) {
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

export default { userUpdate, userDelete }