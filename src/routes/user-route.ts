import express from "express";
import * as userController from '../controller/user-controller'
import { RegisterValidation } from "../middleware/user-validation";
import Authorization from "../middleware/authorization";

const router = express.Router()

router.post('/', RegisterValidation , userController.register)
router.patch('/:id', Authorization.Authenticated , Authorization.SuperAdminOnly, userController.resetPassword)
router.patch('/', userController.changePassword)
router.post('/login', userController.login)
router.get('/refreshToken', userController.RefreshToken)
router.get('/currentUser', Authorization.Authenticated, userController.UserDetail)
router.get('/logout', Authorization.Authenticated , userController.userLogout)


export default router