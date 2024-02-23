import express from "express";
import * as roleController from '../controller/role-controller'
import Authorization from "../middleware/authorization";

const router = express.Router()

router.get('/', Authorization.Authenticated, Authorization.SuperAdminOnly, roleController.getRole)
router.post('/', Authorization.Authenticated, Authorization.AdminOnly, roleController.createRole)
router.put('/:id', Authorization.Authenticated, Authorization.AdminOnly, roleController.updateRole)
router.delete('/:id', Authorization.Authenticated, Authorization.SuperAdminOnly, roleController.deleteRole)

export default router