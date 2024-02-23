import express from "express";
import * as menuController from '../controller/menu-controller'
import Authorization from "../middleware/authorization";
import { CreateMasterMenuValidation } from "../middleware/menu-validation";

const router = express.Router()

router.post('/', Authorization.Authenticated, Authorization.AdminOnly, CreateMasterMenuValidation, menuController.createMenu)
router.get('/', Authorization.Authenticated, menuController.getListMenu)
router.get('/allMenu', Authorization.Authenticated, menuController.getAllMenu)
router.get('/detail/:id', Authorization.Authenticated, Authorization.AdminOnly, menuController.getDetailMenu)
router.patch('/:id', Authorization.Authenticated, Authorization.AdminOnly, CreateMasterMenuValidation, menuController.updateMenu)
router.delete('/:id', Authorization.Authenticated, Authorization.AdminOnly, menuController.softDeleteMenu)
router.delete('delete/:id', Authorization.Authenticated, Authorization.SuperAdminOnly, menuController.deletePermanent)

export default router