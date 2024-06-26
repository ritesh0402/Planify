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
      const board = await BoardModel.findOne({ _id: req.params.id }); // todo: update find board query
      if (!board) {
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