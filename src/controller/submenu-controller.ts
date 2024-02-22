import { Request, Response } from "express";
import Submenu from "../db/models/submenu";
import ResponseHelper from "../helper/responseHelper";

export const createSubmenu = async (req: Request, res: Response): Promise<Response> => {
    try {
        const submenuData = { 
            name: req.body.name, 
            masterMenuID: req.body.masterMenuID, 
            url: req.body.url, 
            title: req.body.title, 
            icon: req.body.icon, 
            ordering: req.body.ordering, 
            isTargetSelf: req.body.isTargetSelf,
            active: true
        } 

        const result = await Submenu.create(submenuData)

        return res.status(201).send(ResponseHelper.ResponseData(true, "Submenu successfully created", null, result))
    } catch (error: any) {
        return res
        .status(500)
        .send(
            ResponseHelper.ResponseData(false, "Internal Server Error", error, null)
        );
    }
};

export const getListSubmenu = async (req: Request, res: Response): Promise<Response> => {
    try {
        const menuData = await Submenu.findAll({ where: { active: true } })

        return res.status(200).send(ResponseHelper.ResponseData(true, "All Data Submenu Active has loaded", null, menuData))
    } catch (error: any) {
        return res
        .status(500)
        .send(
            ResponseHelper.ResponseData(false, "Internal Server Error", error, null)
        );
    }
}

export const getAllSubmenu = async (req: Request, res: Response): Promise<Response> => {
    try {
        const menuData = await Submenu.findAll()

        return res.status(200).send(ResponseHelper.ResponseData(true, "All Data Submenu Active has loaded", null, menuData))
    } catch (error: any) {
        return res
        .status(500)
        .send(
            ResponseHelper.ResponseData(false, "Internal Server Error", error, null)
        );
    }
}

export const getDetailSubmenu = async (req: Request, res: Response): Promise<Response>=> {
    const idMenu = req.params.id

    try {
        const menuData = await Submenu.findOne({
            where: {
                id: idMenu,
                active: true
            }
        })

        if(!menuData) {
            return res.status(404).send(ResponseHelper.ResponseData(false, "Submenu not found", null, null))
        }

        return res.status(200).send(ResponseHelper.ResponseData(true, "Data Submenu found", null, menuData))
    } catch (error: any) {
        return res
        .status(500)
        .send(
            ResponseHelper.ResponseData(false, "Internal Server Error", error, null)
        );
    }
};

export const updateSubmenu = async (req: Request, res: Response): Promise<Response> => {
    const idMenu = req.params.id
    try {
        const submenuData = { 
            name: req.body.name, 
            masterMenuID: req.body.masterMenuID, 
            url: req.body.url, 
            title: req.body.title, 
            icon: req.body.icon, 
            ordering: req.body.ordering, 
            isTargetSelf: req.body.isTargetSelf,
            active: true
         } 

        const result = await Submenu.update(submenuData, { where: { id: idMenu }})

        if(result[0] == 0){
            return res.status(404).send(ResponseHelper.ResponseData(false, "Data Submenu not found", null, null))
        }

        return res.status(201).send(ResponseHelper.ResponseData(true, "Data Submenu successfully updated", null, submenuData))
    } catch (error: any) {
        return res
        .status(500)
        .send(
            ResponseHelper.ResponseData(false, "Internal Server Error", error, null)
        );
    }
};

export const softDeletSubmenu = async (req: Request, res: Response): Promise<Response> => {
    const idMenu = req.params.id
    try {
        const menuData = await Submenu.findOne({
            where: {
                id: idMenu,
                active: true
            }
        })

        if(!menuData) {
            return res.status(404).send(ResponseHelper.ResponseData(false, "Submenu not found", null, null))
        }
        
        menuData.active = false
        return res.status(200).send(ResponseHelper.ResponseData(false, "Submenu already deactivated", null, menuData))
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
        const menuData = await Submenu.destroy({
            where: {
                id: idMenu,
            }
        })

        if(!menuData) {
            return res.status(404).send(ResponseHelper.ResponseData(false, "Submenu not found", null, null))
        }
        
        return res.status(200).send(ResponseHelper.ResponseData(false, "Submenu already deleted", null, menuData))
    } catch (error: any) {
        return res
        .status(500)
        .send(
            ResponseHelper.ResponseData(false, "Internal Server Error", error, null)
        );
    }
};

