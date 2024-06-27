import { Types } from "mongoose";
import BoardModel from "../models/Board";

const boardGetAll = async (req: any, res: any) => {
   try {
      const boards = await BoardModel.find({ creatorId: req.params.userId });

      res.status(200).send(boards);
   } catch (err) {
      res.status(500).send("Internal Server Error!");
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
         return res.status(404).send({ error: "Board not found" })
      }
      return res.status(200).send(board);
   } catch (err) {
      res.status(500).send("Internal Server Error!");
   }
}

const boardCreate = async (req: any, res: any) => {
   try {
      const board = new BoardModel({ creatorId: req.session.userId, boardTitle: req.body.boardTitle });
      await board.save();

      res.status(200).send(board);
   } catch (err) {
      res.status(500).send(err);
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
         return res.sendStatus(404);
      }

      res.status(200).send(updatedBoard);

   } catch (err) {
      res.status(500).send(err);
   }
}

const boardDelete = async (req: any, res: any) => {
   try {
      const boardId = req.params.id;

      const deletedBoard = await BoardModel.findOneAndDelete({
         _id: boardId,
         creatorId: req.session.userId,
      });

      if (!deletedBoard) {
         return res.status(404).send("List not Found");
      }
   } catch (err) {
      res.status(500).send("Internal Server Error!");
   }
}

export default { boardGetAll, boardGet, boardCreate, boardUpdate, boardDelete }