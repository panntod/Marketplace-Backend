import { Request, Response } from "express";
import RoleMenuAccess from "../db/models/rolemenuaccess";
import ResponseHelper from "../helper/responseHelper";
import SubMenu from "../db/models/submenu";
import Role from "../db/models/role";

export const createAccess = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { roleID, submenuID } = req.body;

    const access = await RoleMenuAccess.create({
      roleID,
      submenuID,
      active: true,
    });

    return res
      .status(201)
      .send(
        ResponseHelper.ResponseData(
          true,
          "Role Access has been created",
          null,
          { roleID, submenuID }
        )
      );
  } catch (error: any) {
    return res
      .status(500)
      .send(ResponseHelper.ResponseData(false, "", error, null));
  }
};

export const getListAccess = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const accessData = await RoleMenuAccess.findAll({
      where: {
        active: true,
      },
      include: [
        {
          model: SubMenu,
          attributes: ["name"],
        },
        {
          model: Role,
          attributes: ["roleName"],
        },
      ],
    });
    return res
      .status(201)
      .send(
        ResponseHelper.ResponseData(
          true,
          "All data has been loaded",
          null,
          accessData
        )
      );
  } catch (error: any) {
    return res
      .status(500)
      .send(ResponseHelper.ResponseData(false, "", error, null));
  }
};

export const getAllAccess = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const accessData = await RoleMenuAccess.findAll();
      return res
        .status(201)
        .send(
          ResponseHelper.ResponseData(
            true,
            "All data has been loaded",
            null,
            accessData
          )
        );
  } catch (error: any) {
    return res
      .status(500)
      .send(ResponseHelper.ResponseData(false, "", error, null));
  }
};

export const getDetailAccess = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idAccess = req.params.id
    const accessData = await RoleMenuAccess.findOne({
        where: {
            id: idAccess
        },
        include: [
          {
            model: SubMenu,
            attributes: ["name"],
          },
          {
            model: Role,
            attributes: ["roleName"],
          },
        ],
      });

      if(!accessData){
          return res
            .status(201)
            .send(
              ResponseHelper.ResponseData(
                true,
                "Data not found",
                null,
                null
              )
            );  
      }
      
      return res
        .status(201)
        .send(
          ResponseHelper.ResponseData(
            true,
            "Data found",
            null,
            accessData
          )
        );
  } catch (error: any) {
    return res
      .status(500)
      .send(ResponseHelper.ResponseData(false, "", error, null));
  }
};

export const updateAccess = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idAccess = req.params.id
    const { roleID, submenuID } = req.body

    const result = await RoleMenuAccess.update({ roleID, submenuID }, { where: { id: idAccess } })

    if(!result){
        return res
          .status(201)
          .send(
            ResponseHelper.ResponseData(
              true,
              "Data not found",
              null,
              null
            )
          );  
    }
    
    return res
      .status(200)
      .send(
        ResponseHelper.ResponseData(
          true,
          "Role acces has been update",
          null,
          { roleID, submenuID }
        )
      );    
  } catch (error: any) {
    return res
      .status(500)
      .send(ResponseHelper.ResponseData(false, "", error, null));
  }
};

export const softDeleteAccess = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idAccess = req.params.id

    const accessData = await RoleMenuAccess.findOne({ where: { id: idAccess } })

    if(!accessData){
        return res
          .status(201)
          .send(
            ResponseHelper.ResponseData(
              true,
              "Data not found",
              null,
              null
            )
          );  
    }
    
    accessData.active = false
    return res
      .status(200)
      .send(
        ResponseHelper.ResponseData(
          true,
          "Role acces already deactive",
          null,
          accessData
        )
      );    
  } catch (error: any) {
    return res
      .status(500)
      .send(ResponseHelper.ResponseData(false, "", error, null));
  }
};

export const deleteAccess = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const idAccess = req.params.id

    const result = await RoleMenuAccess.destroy({ where: { id: idAccess } })

    if(!result){
        return res
          .status(201)
          .send(
            ResponseHelper.ResponseData(
              true,
              "Data not found",
              null,
              null
            )
          );  
    }
    
    return res
      .status(200)
      .send(
        ResponseHelper.ResponseData(
          true,
          "Role acces already deleted",
          null,
          result
        )
      );    
  } catch (error: any) {
    return res
      .status(500)
      .send(ResponseHelper.ResponseData(false, "", error, null));
  }
};
