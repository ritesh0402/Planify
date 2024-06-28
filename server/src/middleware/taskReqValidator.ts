import { NextFunction } from "express";
const { param, body, validationResult } = require('express-validator');

const getTaskReqValidator = [
   param('id').exists().notEmpty().isMongoId().escape(),
   (req: any, res: any, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ error: errors.array()[0].msg })
      }
      next()
   }
]

const createTaskReqValidator = [
   // body('_id', 'TaskId is not a valid ObjectId.').exists().notEmpty().isMongoId().escape(),
   body('listId', 'ListId is not a valid ObjectId.').exists().notEmpty().isMongoId().escape(),
   body('boardId', 'BoardId is not a valid ObjectId.').exists().notEmpty().isMongoId().escape(),
   body('taskTitle', 'Invalid taskTitle value.').exists().notEmpty().isLength({ min: 1, max: 64 }).escape(),
   body('position', 'Invalid position value.').exists().notEmpty().isNumeric().escape(),
   (req: any, res: any, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ error: errors.array()[0].msg })
      }
      next()
   }
]

const updateTaskReqValidator = [
   param('id', 'TaskId is not a valid ObjectId.').exists().notEmpty().isMongoId().escape(),
   body('listId', 'ListId is not a valid ObjectId.').exists().notEmpty().isMongoId().escape(),
   body('taskTitle', 'Invalid taskTitle').exists().notEmpty().isLength({ min: 1, max: 64 }).escape(),
   body('position', 'Invalid position value.').exists().notEmpty().isNumeric().escape(),
   body('coverColor', 'Invalid coverColor value.').exists().notEmpty().escape(),
   body('priority', 'Invalid priority value.').exists().notEmpty().escape(),
   body('description', 'Invalid description value.').exists().notEmpty().escape(),
   (req: any, res: any, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ error: errors.array()[0].msg })
      }
      next()
   }
]

const deleteTaskReqValidator = [
   param('id', 'Invalid id.').exists().notEmpty().isMongoId().escape(),
   (req: any, res: any, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ error: errors.array()[0].msg })
      }
      next()
   }
]

// Subtask

const createSubtaskReqValidator = [
   // body('_id', 'SubtaskId is not a valid ObjectId.').exists().notEmpty().isMongoId().escape(),
   body('taskId', 'TaskId is not a valid ObjectId.').exists().notEmpty().isMongoId().escape(),
   body('listId', 'ListId is not a valid ObjectId.').exists().notEmpty().isMongoId().escape(),
   body('boardId', 'BoardId is not a valid ObjectId.').exists().notEmpty().isMongoId().escape(),
   body('subTaskTitle', 'Invalid taskTitle value.').exists().notEmpty().isLength({ min: 1, max: 64 }).escape(),
   body('position', 'Invalid position value.').exists().notEmpty().isNumeric().escape(),
   body('isDone', 'Invalid isDone value.').exists().notEmpty().isBoolean().escape(),
   (req: any, res: any, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ error: errors.array()[0].msg })
      }
      next()
   }
]

const updateSubtaskReqValidator = [
   body('taskId', 'TaskId is not a valid ObjectId.').exists().notEmpty().isMongoId().escape(),
   body('listId', 'ListId is not a valid ObjectId.').exists().notEmpty().isMongoId().escape(),
   body('boardId', 'TaskId is not a valid ObjectId.').exists().notEmpty().isMongoId().escape(),
   body('subTaskTitle', 'Invalid taskTitle').exists().notEmpty().isLength({ min: 1, max: 64 }).escape(),
   body('position', 'Invalid position value.').exists().notEmpty().isNumeric().escape(),
   body('isDone', 'Invalid isDone value.').exists().notEmpty().isBoolean().escape(),
   (req: any, res: any, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ error: errors.array()[0].msg })
      }
      next()
   }
]

const deleteSubtaskReqValidator = [
   param('id').exists().notEmpty().isMongoId().escape(),
   param('idSubtask').exists().notEmpty().isMongoId().escape(),
   (req: any, res: any, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ error: errors.array()[0].msg })
      }
      next()
   }
]


export default { getTaskReqValidator, createTaskReqValidator, updateTaskReqValidator, deleteTaskReqValidator, createSubtaskReqValidator, updateSubtaskReqValidator, deleteSubtaskReqValidator }