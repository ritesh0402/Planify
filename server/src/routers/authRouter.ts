import express from 'express'
import authController from '../controllers/authController'
import checkAuth from '../middleware/checkAuth'
import reqValidator from '../middleware/authReqValidator'
const router = express.Router()

router.get('/login', authController.userGoogleSignupLogin)
router.post('/login', checkAuth.isNotAuthenticated, reqValidator.loginReqValidator, authController.userLogin)

router.get('/signup', authController.userGoogleSignupLogin)
router.post('/signup', reqValidator.signupReqValidator, authController.userSignup)

router.post('/logout', checkAuth.isAuthenticated, authController.userLogout)

router.get('/user', authController.userCheckAuth)
router.get('/verify/:token', reqValidator.userEmailVerifyReqValidator, authController.userEmailVerify)

// add guest login

export default router