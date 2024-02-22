import { Request, Response } from "express";
import Role from "../db/models/role";
import ResponseHelper from "../helper/responseHelper";

export const getRole = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const roles = await Role.findAll({
      where: {
        active: true,
      },
    });
    return res
      .status(200)
      .send(
        ResponseHelper.ResponseData(
          true,
          "Data role has been loaded",
          null,
          roles
        )
      );
  } catch (error: any) {
    return res
      .status(500)
      .send(
        ResponseHelper.ResponseData(false, "Internal Server Error", error, null)
      );
  }
};

export const createRole = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let { roleName, active } = req.body;
    const result = await Role.create({
      roleName,
      active,
    });
    return res.status(201).send(ResponseHelper.ResponseData(true, "Data role has been inserted", null, { roleName, active }));
  } catch (error: any) {
    return res
      .status(500)
      .send(
        ResponseHelper.ResponseData(false, "Internal Server Error", error, null)
      );
  }
};

export const updateRole = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idRole = req.params.id;
  const { roleName, active } = req.body;
  try {
    const result = await Role.update(
      { roleName, active },
      { where: { id: idRole } }
    );

    if (result[0] == 0) {
      return res.status(404).send({
        success: false,
        message: "Data Role is not found",
      });
    }

    return res.status(201).send(ResponseHelper.ResponseData(true, "Data role has been updated", null, { roleName, active }));
  } catch (error: any) {
    return res
      .status(500)
      .send(
        ResponseHelper.ResponseData(false, "Internal Server Error", error, null)
      );
  }
};

export const deleteRole = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let idRole = req.params.id;
  try {
    const result = await Role.destroy({ where: { id: idRole } });

    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Data Role is not found",
      });
    }

    return res.status(201).send(ResponseHelper.ResponseData(true, "Data role has been deleted", null, null));
  } catch (error) {
    return res
      .status(500)
      .send(
        ResponseHelper.ResponseData(false, "Internal Server Error", error, null)
      );
  }
};
