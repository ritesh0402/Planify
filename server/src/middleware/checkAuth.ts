import { NextFunction } from 'express';

const isAuthenticated = (req: any, res: any, next: NextFunction) => {
   if (!req.session.userId) {
      return res.status(401).send({ status: "Failure", data: {}, error: '', msg: 'You are not logged in!' })
   } else {
      next();
   }
}
const isNotAuthenticated = (req: any, res: any, next: NextFunction) => {
   if (!req.session.userId) {
      next();
   } else {
      return res.status(401).send({ status: "Failure", data: {}, error: '', msg: 'You are not logged in!' })
   }
}

export default { isAuthenticated, isNotAuthenticated };