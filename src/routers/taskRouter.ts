import express from 'express'
import checkAuth from '../middleware/checkAuth';
import taskReqValidator from '../middleware/taskReqValidator';
import taskController from '../controllers/taskController'
const router = express.Router();

router.use(checkAuth.isAuthenticated)

router.get('/:id', taskReqValidator.getTaskReqValidator, taskController.taskGet)
router.post('/', taskReqValidator.createTaskReqValidator, taskController.taskCreate)
router.put('/:id', taskReqValidator.updateTaskReqValidator, taskController.taskUpdate)
router.delete('/:id', taskReqValidator.deleteTaskReqValidator, taskController.taskDelete)

// Subtask routes
router.post('/:id/checklist', taskReqValidator.createSubtaskReqValidator, taskController.subtaskCreate)
router.put('/:id/checklist/:idSubtask', taskReqValidator.updateSubtaskReqValidator, taskController.subtaskUpdate)
router.delete('/:id/checklist/:idSubtask', taskReqValidator.deleteSubtaskReqValidator, taskController.subtaskDelete)


export default router