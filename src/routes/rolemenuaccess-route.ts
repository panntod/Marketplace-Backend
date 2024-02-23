import express from "express";
import * as accessController from '../controller/rolemenuaccess-controller'
import Authorization from "../middleware/authorization";
import { CreateMenuAccessValidation } from "../middleware/menu-validation";

const router = express.Router()

router.post('/', Authorization.Authenticated, Authorization.SuperAdminOnly, CreateMenuAccessValidation, accessController.createAccess)
router.get('/', Authorization.Authenticated, Authorization.SuperAdminOnly, accessController.getListAccess)
router.get('/all', Authorization.Authenticated, Authorization.SuperAdminOnly, accessController.getAllAccess)
router.get('/:id', Authorization.Authenticated, Authorization.SuperAdminOnly, accessController.getDetailAccess)
router.patch('/:id', Authorization.Authenticated, Authorization.SuperAdminOnly,CreateMenuAccessValidation, accessController.updateAccess)
router.delete('/:id', Authorization.Authenticated, Authorization.SuperAdminOnly, accessController.softDeleteAccess)
router.delete('/:id', Authorization.Authenticated, Authorization.SuperAdminOnly, accessController.deleteAccess)

export default router