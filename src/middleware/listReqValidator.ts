import { NextFunction } from "express";
import mongoose from "mongoose";
const { param, body, validationResult } = require('express-validator');

const getListReqValidator = [
   param('id', 'BoardId is not a valid ObjectId.').exists().notEmpty().isMongoId().escape(),
   (req: any, res: any, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ error: errors.array()[0].msg })
      }
      next();
   }
]

const createListReqValidator = [
   body('boardId').exists().notEmpty().isMongoId().escape(),
   body('listTitle', 'Invalid listTitle').exists().notEmpty().isLength({ min: 1, max: 64 }).escape(),
   body('position').exists().notEmpty().isNumeric().escape(),
   body('_id').exists().notEmpty().isMongoId().escape(),
   (req: any, res: any, next: NextFunction) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ error: errors.array()[0].msg })
      }
      next();
   }
]

const updateListReqValidator = [
   param('id', 'BoardId is not a valid ObjectId.').exists().notEmpty().isMongoId().escape(),
   body('listTitle', 'Invalid listTitle').exists().notEmpty().isLength({ min: 1, max: 64 }).escape(),
   body('position').exists().notEmpty().isNumeric().escape(),
   body('coverColor').exists().notEmpty().escape(),
   (req: any, res: any, next: NextFunction) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ error: errors.array()[0].msg })
      }
      next();
   }
]

const deleteListReqValidator = [
   param('id', 'BoardId is not a valid ObjectId.').exists().notEmpty().isMongoId().escape(),
   (req: any, res: any, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ error: errors.array()[0].msg })
      }
      next();
   }
]

export default { getListReqValidator, createListReqValidator, updateListReqValidator, deleteListReqValidator }