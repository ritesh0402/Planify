import { NextFunction } from "express";
import mongoose from "mongoose";
import ListModel from "../models/List";
const { body, validationResult } = require('express-validator');

const getListReqValidator = (req: any, res: any, next: NextFunction) => {
   if (!req.params.id) {
      return res.status(400).json({ error: 'Invalid Request' });
   }
   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid listId' });
   }
   next();
}

const createListReqValidator = (req: any, res: any, next: NextFunction) => {
   if (!req.body.boardId || !req.body.listTitle || !req.body.position || !req.body._id) {
      return res.status(400).json({ error: 'Missing one or more felids!' });
   }
   if (!mongoose.Types.ObjectId.isValid(req.body.boardId)) {
      return res.status(400).json({ error: 'Invalid boardId' });
   }
   if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
      return res.status(400).json({ error: 'Invalid _id' });
   }
   body('listTitle', 'Title must not be empty.').isLength({ min: 1, max: 64 });
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }
   next();
}

const updateListReqValidator = (req: any, res: any, next: NextFunction) => {
   if (!req.params.id || !req.body.listTitle || !req.body.position || !req.body.coverColor) {
      return res.status(400).json({ error: 'Missing one or more felids!' });
   }
   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid listId' });
   }
   body('boardTitle', 'Title must not be empty.').isLength({ min: 1, max: 64 });
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }
   next();
}

const deleteListReqValidator = (req: any, res: any, next: NextFunction) => {
   if (!req.params.id) {
      return res.status(400).json({ error: 'Invalid Request' });
   }
   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid BoardId' });
   }
   next();
}

export default { getListReqValidator, createListReqValidator, updateListReqValidator, deleteListReqValidator }