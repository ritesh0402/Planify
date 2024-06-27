import ListModel from "../models/List";
import utilityFn from "../utils/utilityFn";

const listGet = async (req: any, res: any) => {
   try {
      const list = await ListModel.findById(req.params.id);
      if (!list) {
         return res.status(404).send({ error: "List not found" })
      }
      return res.status(200).send(list);
   } catch (err) {
      res.status(500).send("Internal Server Error!");
   }
}

const listCreate = async (req: any, res: any) => {
   try {
      const list = new ListModel({
         _id: req.body._id,
         listTitle: req.body.listTitle,
         boardId: req.body.boardId,
         position: req.body.position,
      });
      await list.save();

      res.status(200).send(list);
   } catch (err) {
      res.status(500).send(err);
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

      // Sets new positions if the new pos of the list is too close to neighbouring lists
      if (utilityFn.isTooClose(req.body.position)) {
         const boardId = req.body.boardId;
         await utilityFn.recalcItemsPos({ boardId: boardId }, ListModel);

         // return;
      }

      res.status(200).send(updatedList);
   } catch (err) {
      res.status(500).send(err);
   }
}

const listDelete = async (req: any, res: any) => {
   try {
      const listId = req.params.id;

      const deletedList = await ListModel.findOneAndDelete({ _id: listId });

      if (!deletedList) {
         return res.status(404).send("List not Found");
      }
      res.status(200).send(deletedList)
   } catch (err) {
      res.status(500).send("Internal Server Error!");
   }
}


export default { listGet, listCreate, listUpdate, listDelete }