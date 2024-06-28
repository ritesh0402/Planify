import ListModel from "../models/List";
import utilityFn from "../utils/utilityFn";

const listGet = async (req: any, res: any) => {
   try {
      const list = await ListModel.findById(req.params.id);
      if (!list) {
         return res.status(404).send({ status: "Failure", data: {}, error: "List not found!", msg: "Something went wrong." })
      }
      return res.status(200).send({ status: "Success", data: { list }, error: "", msg: "List retrieved." });
   } catch (err) {
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

const listCreate = async (req: any, res: any) => {
   try {
      const list = new ListModel({
         // _id: req.body._id,
         listTitle: req.body.listTitle,
         boardId: req.body.boardId,
         position: req.body.position,
      });
      await list.save();
      if (!list) {
         return res.status(404).send({ status: "Failure", data: {}, error: "Mongo error", msg: "List not created!" });
      }

      res.status(200).send({ status: "Success", data: { list }, error: "", msg: "Task Successfully Created" });
   } catch (err) {
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

const listUpdate = async (req: any, res: any) => {
   try {
      const updatedList = await ListModel.findByIdAndUpdate(req.params.id, {
         listTitle: req.body.listTitle,
         position: req.body.position,
         coverColor: req.body.coverColor
      },
         { new: true }
      );

      if (!updatedList) {
         return res.status(404).send({ status: "Failure", data: {}, error: "Mongo error", msg: "List not updated!" });
      }
      if (utilityFn.isTooClose(req.body.position)) {
         const boardId = req.body.boardId;
         await utilityFn.recalcItemsPos({ boardId: boardId }, ListModel);
      }

      res.status(200).send({ status: "Success", data: { updatedList }, error: "", msg: "List successfully updated." });
   } catch (err) {
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

const listDelete = async (req: any, res: any) => {
   try {
      const listId = req.params.id;

      const deletedList = await ListModel.findOneAndDelete({ _id: listId });

      if (!deletedList) {
         return res.status(404).send({ status: "Failure", data: {}, error: "List not found!", msg: "Something went wrong." });
      }
      res.status(200).send({ status: "Success", data: { deletedList }, error: "", msg: "Task successfully deleted." })
   } catch (err) {
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}


export default { listGet, listCreate, listUpdate, listDelete }