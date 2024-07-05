import express from 'express'
import checkAuth from '../middleware/checkAuth';
import userReqValidator from '../middleware/userReqValidator';
import userController from '../controllers/userController';
const router = express.Router();

router.use(checkAuth.isAuthenticated)

router.post('/:userId/update', userReqValidator.updateUserReqValidator, userController.userUpdate)

router.delete('/:userId', userController.userDelete)

export default router
