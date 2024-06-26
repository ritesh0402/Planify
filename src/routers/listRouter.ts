import express from "express"
const router = express.Router();
import checkAuth from "../middleware/checkAuth";
import listReqValidator from "../middleware/listReqValidator";
import listController from "../controllers/listController";

router.use(checkAuth.isAuthenticated)

router.get('/:id', listReqValidator.getListReqValidator, listController.listGet)
router.post('/', listReqValidator.createListReqValidator, listController.listCreate)
router.put('/:id', listReqValidator.updateListReqValidator, listController.listUpdate)
router.delete('/:id', listReqValidator.deleteListReqValidator, listController.listDelete)

export default router