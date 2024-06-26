import { NextFunction } from "express";
import mongoose from "mongoose";
const { body, validationResult } = require('express-validator');

const getAllUserBoardsReqValidator = (req: any, res: any, next: NextFunction) => {
   if (!req.params.userId) {
      return res.status(400).json({ error: 'Invalid Request' });
   }
   if (req.params.userId !== req.session.userId) {
      return res.status(401).json({ error: 'Access Denied' });
   }
   if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ error: 'Invalid UserId' });
   }
   next();
}

const getBoardReqValidator = (req: any, res: any, next: NextFunction) => {
   if (!req.params.id) {
      return res.status(400).json({ error: 'Invalid Request' });
   }
   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid BoardId' });
   }
   next();

}

const createBoardReqValidator = (req: any, res: any, next: NextFunction) => {
   if (!req.body.boardTitle) {
      return res.status(400).json({ error: 'Missing one or more felids!' });
   }
   body('boardTitle', 'Title must not be empty.').isLength({ min: 1, max: 64 });
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }
   next();
}

const updateBoardReqValidator = (req: any, res: any, next: NextFunction) => {
   if (!req.params.id || !req.body.boardTitle) {
      return res.status(400).json({ error: 'Missing one or more felids!' });
   }
   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid BoardId' });
   }
   body('boardTitle', 'Title must not be empty.').isLength({ min: 1, max: 64 });
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }
   next();
}

const deleteBoardReqValidator = (req: any, res: any, next: NextFunction) => {
   if (!req.params.id) {
      return res.status(400).json({ error: 'Invalid Request' });
   }
   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid BoardId' });
   }
   next();
}


export default { getAllUserBoardsReqValidator, getBoardReqValidator, createBoardReqValidator, updateBoardReqValidator, deleteBoardReqValidator }