import express from 'express'
import authController from '../controllers/authController'
import checkAuth from '../middleware/auth'
import reqValidator from '../middleware/reqValidator'
const router = express.Router()

router.post('/login', checkAuth.isNotAuthenticated, reqValidator.loginReqValidator, authController.userLogin)
router.post('/signup', reqValidator.signupReqValidator, authController.userSignup)
router.post('/logout', checkAuth.isAuthenticated, authController.userLogout)
router.post('/user', authController.userCheckAuth)

// add guest login

export default router