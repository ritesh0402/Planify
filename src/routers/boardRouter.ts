import express from "express";
import checkAuth from "../middleware/checkAuth";
import boardController from "../controllers/boardController";
import boardReqValidator from "../middleware/boardReqValidator"

const router = express.Router();

router.use(checkAuth.isAuthenticated)

router.get('/:userId/boards', boardReqValidator.getAllUserBoardsReqValidator, boardController.boardGetAll)
router.get('/board/:id', boardReqValidator.getBoardReqValidator, boardController.boardGet)
router.post('/board', boardReqValidator.createBoardReqValidator, boardController.boardCreate)
router.patch('/board/:id', boardReqValidator.updateBoardReqValidator, boardController.boardUpdate)
router.delete('/board/:id', boardReqValidator.deleteBoardReqValidator, boardController.boardDelete)

export default router;
