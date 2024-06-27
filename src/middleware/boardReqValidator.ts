import { NextFunction } from "express";
import mongoose from "mongoose";
const { body, param, validationResult } = require('express-validator');

const getAllUserBoardsReqValidator = [
   param('userId', 'BoardId is not a valid ObjectId.').exists().notEmpty().isMongoId().escape(),
   (req: any, res: any, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ error: errors.array()[0].msg })
      }

      if (req.params.userId !== req.session.userId) {
         return res.status(401).json({ error: 'Access Denied' });
      }
      next();
   }
]

const getBoardReqValidator = [
   param('id', 'BoardId is not a valid ObjectId.').exists().notEmpty().isMongoId().escape(),
   (req: any, res: any, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ error: errors.array()[0].msg })
      }
      next();

   }
]

const createBoardReqValidator = [
   body('boardTitle', 'Invalid boardTitle.').exists().notEmpty().isLength({ min: 1, max: 64 }).escape(),
   (req: any, res: any, next: NextFunction) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array()[0].msg })
      }
      next();
   }
]

const updateBoardReqValidator = [
   body('boardTitle', 'Invalid boardTitle.').exists().notEmpty().isLength({ min: 1, max: 64 }).escape(),
   param('id', 'BoardId is not a valid ObjectId.').exists().notEmpty().isMongoId().escape(),
   (req: any, res: any, next: NextFunction) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }
      next();
   }
]

const deleteBoardReqValidator = [
   param('id', 'BoardId is not a valid ObjectId.').exists().notEmpty().isMongoId().escape(),
   (req: any, res: any, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).send({ error: errors.array()[0].msg })
      }
      next();
   }
]


export default { getAllUserBoardsReqValidator, getBoardReqValidator, createBoardReqValidator, updateBoardReqValidator, deleteBoardReqValidator }