import TaskModel from "../models/Task";
import SubTaskModel from "../models/SubTask";
import utilityFn from "../utils/utilityFn";


const taskGet = async (req: any, res: any) => {
   const taskId = req.params.id;
   try {
      const task = await TaskModel.findById(taskId);
      if (!task) {
         return res.status(404).send({ status: "Failure", data: {}, error: "Task not found!", msg: "Something went wrong." });
      }
      res.status(200).send({ status: "Success", data: { task }, error: "", msg: "Task retrieved." });
   } catch (err) {
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

const taskCreate = async (req: any, res: any) => {
   try {
      const newTask = await new TaskModel({
         // _id: req.body._id,
         taskTitle: req.body.taskTitle,
         position: req.body.position,
         listId: req.body.listId,
         boardId: req.body.boardId,
      }).save();

      if (!newTask) {
         return res.status(404).send({ status: "Failure", data: {}, error: "Mongo error", msg: "Task not created!" });
      }
      res.status(200).send({ status: "Success", data: { newTask }, error: "", msg: "Task Successfully Created" });
   } catch (err) {
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

const taskUpdate = async (req: any, res: any) => {
   try {
      const updatedTask = await TaskModel.findOneAndUpdate({ _id: req.params.id },
         {
            taskTitle: req.body.taskTitle,
            description: req.body.description,
            coverColor: req.body.coverColor,
            position: req.body.position,
            priority: req.body.priority,
            listId: req.body.listId,
         },
         {
            new: true,
         }
      );

      if (!updatedTask) {
         return res.status(404).send({ status: "Failure", data: {}, error: "Mongo error", msg: "Task not updated!" });
      }
      if (utilityFn.isTooClose(req.body.position)) {
         const listId = req.body.listId;
         const tasks = await utilityFn.recalcItemsPos({ listId }, TaskModel);

      }
      res.status(200).send({ status: "Success", data: { updatedTask }, error: "", msg: "Task successfully updated." });
   } catch (err) {
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

const taskDelete = async (req: any, res: any) => {
   const taskId = req.params.id;
   try {
      const deletedTask = await TaskModel.findByIdAndDelete(taskId);
      if (!deletedTask) {
         return res.status(404).send({ status: "Failure", data: {}, error: "Task not found!", msg: "Something went wrong." });
      }
      res.status(200).send({ status: "Success", data: { deletedTask }, error: "", msg: "Task successfully deleted." });
   } catch (err) {
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

// Subtask


const subtaskCreate = async (req: any, res: any) => {
   try {
      const newSubTask = await new SubTaskModel({
         // _id: req.body._id,
         subTaskTitle: req.body.subTaskTitle,
         position: req.body.position,
         isDone: req.body.isDone,
         taskId: req.body.taskId,
         listId: req.body.listId,
         boardId: req.body.boardId,
      }).save();

      if (!newSubTask) {
         return res.status(404).send({ status: "Failure", data: {}, error: "Mongo error", msg: "Subtask not created!" });
      }
      res.status(200).send({ status: "Success", data: { newSubTask }, error: "", msg: "Subtask Successfully Created" });
   } catch (err) {
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

const subtaskUpdate = async (req: any, res: any) => {
   try {
      const updatedSubTask = await SubTaskModel.findByIdAndUpdate(req.params.id,
         {
            subTaskTitle: req.body.subTaskTitle,
            position: req.body.position,
            isDone: req.body.isDone,
            taskId: req.body.taskId,
            listId: req.body.listId,
            boardId: req.body.boardId,
         },
         {
            new: true,
         }
      );

      if (!updatedSubTask) {
         return res.status(404).send({ status: "Failure", data: {}, error: "Mongo error", msg: "Subtask not updated!" });
      }
      if (utilityFn.isTooClose(req.body.position)) {
         const taskId = req.body.taskId;
         await utilityFn.recalcItemsPos({ taskId }, SubTaskModel);

         // return;
      }
      res.status(200).send({ status: "Success", data: { updatedSubTask }, error: "", msg: "Subtask successfully updated." });
   } catch (err) {
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

const subtaskDelete = async (req: any, res: any) => {
   const subtaskId = req.params.idSubtask;
   try {
      const deletedSubTask = await SubTaskModel.findByIdAndDelete(subtaskId);
      if (!deletedSubTask) {
         return res.status(404).send({ status: "Failure", data: {}, error: "Subtask not found!", msg: "Something went wrong." });
      }
      res.status(200).send({ status: "Success", data: { deletedSubTask }, error: "", msg: "Subtask successfully updated." });
   } catch (err) {
      res.status(500).send({ status: "Failure", data: {}, error: err, msg: "Internal Server Error!" });
   }
}

export default { taskGet, taskCreate, taskUpdate, taskDelete, subtaskCreate, subtaskUpdate, subtaskDelete }