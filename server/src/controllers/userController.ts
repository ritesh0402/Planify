import UserModel from '../models/User'

const userUpdate = async (req: any, res: any) => {
   try {
      const userId = req.params.id;
      const updatedUser = await UserModel.findOneAndUpdate(
         { _id: userId },
         {
            username: req.body.username,
            password: req.body.password,
            phone: req.body.phone,
            profile: req.body.profile
         },
         { new: true }
      );

      if (!updatedUser) {
         return res.sendStatus(404).send({ status: "Failure", data: {}, error: "Mongo error", msg: "User not updated!" });
      }

      res.status(200).send({ status: "Success", data: { updatedUser }, error: "", msg: "User successfully updated." });

   } catch (err) {
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