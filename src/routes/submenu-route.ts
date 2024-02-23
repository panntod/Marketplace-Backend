import express from "express";
import * as submenuController from '../controller/submenu-controller'
import Authorization from "../middleware/authorization";
import { CreateSubmenuValidation } from "../middleware/menu-validation";

const router = express.Router()

router.post('/', Authorization.Authenticated, Authorization.AdminOnly, CreateSubmenuValidation, submenuController.createSubmenu)
router.get('/', Authorization.Authenticated, submenuController.getListSubmenu)
router.get('/allMenu', Authorization.Authenticated, submenuController.getAllSubmenu)
router.get('/detail/:id', Authorization.Authenticated, Authorization.AdminOnly, submenuController.getDetailSubmenu)
router.patch('/:id', Authorization.Authenticated, Authorization.AdminOnly,CreateSubmenuValidation, submenuController.updateSubmenu)
router.delete('/:id', Authorization.Authenticated, Authorization.AdminOnly, submenuController.softDeletSubmenu)
router.delete('delete/:id', Authorization.Authenticated, Authorization.SuperAdminOnly, submenuController.deletePermanent)

export default router