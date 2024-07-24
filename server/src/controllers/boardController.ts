import mongoose, { Types } from "mongoose";
import BoardModel from "../models/Board";

const boardGetAll = async (req: any, res: any) => {
   try {
      const boards = await BoardModel.find({ creatorId: req.params.userId });
      if (!boards) {
         return res.status(404).send({ status: "Failure", data: {}, error: "Boards were not found!", msg: "Something went wrong." });
      }
      res.status(200).send({ status: "Success", data: { boards }, error: "", msg: "Boards retrieved." });
   } catch (err) {
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

const boardGet = async (req: any, res: any) => {
   try {
      const creatorId = new Types.ObjectId(req.session.userId)
      const _id = new Types.ObjectId(req.params.id)
      const board = await BoardModel.aggregate([
         {
            $match: { _id: _id, creatorId: creatorId },
         },
         {
            $lookup: {
               from: 'lists',
               localField: '_id',
               foreignField: 'boardId',
               as: 'lists',
            },
         },
         {
            $lookup: {
               from: 'tasks',
               let: { boardId: '$_id' },
               pipeline: [
                  { $match: { $expr: { $eq: ['$boardId', '$$boardId'] } } },
                  {
                     $lookup: {
                        from: 'subtasks',
                        let: { taskId: '$_id' },
                        pipeline: [
                           {
                              $match: { $expr: { $eq: ['$taskId', '$$taskId'] } },
                           },
                        ],
                        as: 'subtasks',
                     },
                  },
               ],
               as: 'tasks',
            },
         },
      ]);

      if (!board || !board.length) {
         return res.status(404).send({ status: "Failure", data: {}, error: "Board were not found!", msg: "Something went wrong." })
      }
      return res.status(200).send({ status: "Success", data: board, error: "", msg: "Board retrieved." });
   } catch (err) {
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

const boardCreate = async (req: any, res: any) => {
   try {
      const board = new BoardModel({ creatorId: req.session.userId, boardTitle: req.body.boardTitle });
      await board.save();
      if (!board) {
         return res.status(404).send({ status: "Failure", data: {}, error: "Mongo error", msg: "Board not created!" });
      }
      res.status(200).send({ status: "Success", data: { board }, error: "", msg: "Board Successfully Created" });
   } catch (err) {
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

const boardUpdate = async (req: any, res: any) => {
   try {
      const boardId = req.params.id;
      const updatedBoard = await BoardModel.findOneAndUpdate(
         { _id: boardId, creatorId: req.session.userId },
         { boardTitle: req.body.boardTitle },
         { new: true }
      );

      if (!updatedBoard) {
         return res.sendStatus(404).send({ status: "Failure", data: {}, error: "Mongo error", msg: "Board not updated!" });
      }

      res.status(200).send({ status: "Success", data: { updatedBoard }, error: "", msg: "Board successfully updated." });

   } catch (err) {
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

const boardDelete = async (req: any, res: any) => {
   try {
      const boardId = new mongoose.Types.ObjectId(req.params.id);

      const deletedBoard = await BoardModel.findOneAndDelete({
         _id: boardId,
         creatorId: req.session.userId,
      });

      if (!deletedBoard) {
         return res.status(404).send({ status: "Failure", data: {}, error: "Board not found!", msg: "Something went wrong." });
      }
      res.status(200).send({ status: "Success", data: { deletedBoard }, error: "", msg: "Board successfully deleted." });
   } catch (err) {
      console.log(err)
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

export default { boardGetAll, boardGet, boardCreate, boardUpdate, boardDelete }