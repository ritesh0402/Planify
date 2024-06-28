import TaskModel from "../models/Task";
import SubTaskModel from "../models/SubTask";
import utilityFn from "../utils/utilityFn";


const taskGet = async (req: any, res: any) => {
   const taskId = req.params.id;
   try {
      const task = await TaskModel.findById(taskId);
      if (!task) {
         return res.status(404).send({ error: "Task not found!" });
      }
      res.status(200).send(task);
   } catch (err) {
      res.status(500).send(err);
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
         return res.status(404).send({ error: "Task not created!" });
      }
      res.status(200).send(newTask);
   } catch (err) {
      res.status(500).send(err);
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
         return res.status(404).send({ error: "Task not updated!" });
      }
      if (utilityFn.isTooClose(req.body.position)) {
         const listId = req.body.listId;
         const tasks = await utilityFn.recalcItemsPos({ listId }, TaskModel);

         return res.send(tasks);
      }
      res.status(200).send(updatedTask);
   } catch (err) {
      res.status(500).send(err);
   }
}

const taskDelete = async (req: any, res: any) => {
   const taskId = req.params.id;
   try {
      const deletedTask = await TaskModel.findByIdAndDelete(taskId);
      if (!deletedTask) {
         return res.status(404).send({ error: "Task not found!" });
      }
      res.status(200).send(deletedTask);
   } catch (err) {
      res.status(500).send(err);
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
         return res.status(404).send({ error: "Task not created!" });
      }
      res.status(200).send(newSubTask);
   } catch (err) {
      res.status(500).send(err);
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
         return res.status(404).send({ error: "Task not updated!" });
      }
      if (utilityFn.isTooClose(req.body.position)) {
         const taskId = req.body.taskId;
         await utilityFn.recalcItemsPos({ taskId }, SubTaskModel);

         return;
      }
      res.status(200).send(updatedSubTask);
   } catch (err) {
      res.status(500).send(err);
   }
}

const subtaskDelete = async (req: any, res: any) => {
   const subtaskId = req.params.idSubtask;
   try {
      const deletedSubTask = await SubTaskModel.findByIdAndDelete(subtaskId);
      if (!deletedSubTask) {
         return res.status(404).send({ error: "Subtask not deleted!" });
      }
      res.status(200).send(deletedSubTask);
   } catch (err) {
      res.status(500).send(err);
   }
}

export default { taskGet, taskCreate, taskUpdate, taskDelete, subtaskCreate, subtaskUpdate, subtaskDelete }