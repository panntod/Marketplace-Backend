import { Request, Response } from "express";
import MasterMenu from "../db/models/mastermenu";
import ResponseHelper from "../helper/responseHelper";

export const createMenu = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, icon, ordering } = req.body
        const result = await MasterMenu.create({ name, icon, ordering, active: true })

        return res.status(201).send(ResponseHelper.ResponseData(true, "Master menu successfully created", null, result))
    } catch (error: any) {
        return res
        .status(500)
        .send(
            ResponseHelper.ResponseData(false, "Internal Server Error", error, null)
        );
    }
};

export const getListMenu = async (req: Request, res: Response): Promise<Response> => {
    try {
        const menuData = await MasterMenu.findAll({ where: { active: true } })

        return res.status(200).send(ResponseHelper.ResponseData(true, "All Data Menu Active has loaded", null, menuData))
    } catch (error: any) {
        return res
        .status(500)
        .send(
            ResponseHelper.ResponseData(false, "Internal Server Error", error, null)
        );
    }
}

export const getAllMenu = async (req: Request, res: Response): Promise<Response> => {
    try {
        const menuData = await MasterMenu.findAll()

        return res.status(200).send(ResponseHelper.ResponseData(true, "All Data Menu Active has loaded", null, menuData))
    } catch (error: any) {
        return res
        .status(500)
        .send(
            ResponseHelper.ResponseData(false, "Internal Server Error", error, null)
        );
    }
}

export const getDetailMenu = async (req: Request, res: Response): Promise<Response>=> {
    const idMenu = req.params.id

    try {
        const menuData = await MasterMenu.findOne({
            where: {
                id: idMenu,
                active: true
            }
        })

        if(!menuData) {
            return res.status(404).send(ResponseHelper.ResponseData(false, "Menu not found", null, null))
        }

        return res.status(200).send(ResponseHelper.ResponseData(true, "Data menu found", null, menuData))
    } catch (error: any) {
        return res
        .status(500)
        .send(
            ResponseHelper.ResponseData(false, "Internal Server Error", error, null)
        );
    }
};

export const updateMenu = async (req: Request, res: Response): Promise<Response> => {
    const idMenu = req.params.id
    try {
        const { name, icon, ordering } = req.body

        const result = await MasterMenu.update({ name, icon, ordering, active: true}, { where: { id: idMenu }})

        if(result[0] == 0){
            return res.status(404).send(ResponseHelper.ResponseData(false, "Data menu not found", null, null))
        }

        return res.status(201).send(ResponseHelper.ResponseData(true, "Data menu successfully updated", null, { name: name, icon: icon, ordering: ordering }))
    } catch (error: any) {
        return res
        .status(500)
        .send(
            ResponseHelper.ResponseData(false, "Internal Server Error", error, null)
        );
    }
};

export const softDeleteMenu = async (req: Request, res: Response): Promise<Response> => {
    const idMenu = req.params.id
    try {
        const menuData = await MasterMenu.findOne({
            where: {
                id: idMenu,
                active: true
            }
        })

        if(!menuData) {
            return res.status(404).send(ResponseHelper.ResponseData(false, "Menu not found", null, null))
        }
        
        menuData.active = false
        return res.status(200).send(ResponseHelper.ResponseData(false, "Menu already deactivated", null, menuData))
    } catch (error: any) {
        return res
        .status(500)
        .send(
            ResponseHelper.ResponseData(false, "Internal Server Error", error, null)
        );
    }
};

export const deletePermanent = async (req: Request, res: Response): Promise<Response> => {
    const idMenu = req.params.id
    try {
        const menuData = await MasterMenu.destroy({
            where: {
                id: idMenu,
            }
        })

        if(!menuData) {
            return res.status(404).send(ResponseHelper.ResponseData(false, "Menu not found", null, null))
        }
        
        return res.status(200).send(ResponseHelper.ResponseData(false, "Menu already deleted", null, menuData))
    } catch (error: any) {
        return res
        .status(500)
        .send(
            ResponseHelper.ResponseData(false, "Internal Server Error", error, null)
        );
    }
};

