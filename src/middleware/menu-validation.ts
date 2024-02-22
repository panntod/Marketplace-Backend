import Validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import responseHelper from "../helper/responseHelper";
import MasterMenu from "../db/models/mastermenu";
import Role from "../db/models/role";
import SubMenu from "../db/models/submenu";

export const CreateMasterMenuValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, icon, ordering } = req.body;

    const menuData = {
      name,
      icon,
      ordering,
    };

    const rules: Validator.Rules = {
      name: "required|string|max:60",
      icon: "string",
      ordering: "required|numeric",
    };

    const validate = new Validator(menuData, rules);

    if (validate.fails()) {
      return res
        .status(400)
        .send(
          responseHelper.ResponseData(
            false,
            "Bad Request",
            validate.errors,
            null
          )
        );
    }

    next();
  } catch (error: any) {
    return res
      .status(500)
      .send(responseHelper.ResponseData(false, "", error, null));
  }
};

export const CreateSubmenuValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, masterMenuID, url, title, icon, ordering, isTargetSelf } =
      req.body;

    const submenuData = {
      name,
      masterMenuID,
      url,
      title,
      icon,
      ordering,
      isTargetSelf,
    };

    const rules: Validator.Rules = {
      name: "required|string|max:50",
      masterMenuID: "required|numeric",
      url: "required|string",
      title: "required|string|max:50",
      icon: "required|string",
      ordering: "required|numeric",
      isTargetSelf: "required|boolean",
    };

    const validate = new Validator(submenuData, rules);

    if (validate.fails()) {
      return res
        .status(400)
        .send(
          responseHelper.ResponseData(
            false,
            "Bad Request",
            validate.errors,
            null
          )
        );
    }

    const validateMenu = await MasterMenu.findOne({
      where: {
        id: masterMenuID,
        active: true,
      },
    });

    if (!validateMenu) {
      const errorData = {
        errors: {
          mastermsenuId: ["Master menu not found"],
        },
      };

      return res
        .status(400)
        .send(
          responseHelper.ResponseData(false, "Bad Request", errorData, null)
        );
    }

    next();
  } catch (error: any) {
    return res
      .status(500)
      .send(responseHelper.ResponseData(false, "", error, null));
  }
};

export const CreateMenuAccessValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roleID, submenuID } = req.body;

    const validationRules = {
      roleID: "required|numeric",
      submenuID: "required|numeric",
    };
    
    const validation = new Validator({ roleID, submenuID }, validationRules);
    
    if (validation.fails()) {
      return res.status(400).send(responseHelper.ResponseData(false, "Bad Request", validation.errors, null));
    }
    
    const roleValidate = await Role.findOne({
      where: {
        id: roleID,
        active: true,
      },
    });
    
    const subValidate = await SubMenu.findOne({
      where: {
        id: submenuID,
        active: true,
      },
    });
    
    if (!roleValidate) {
      const errorData = {
        errors: {
          roleId: ["Role not found"],
        },
      };
    
      return res.status(400).send(responseHelper.ResponseData(false, "Bad Request", errorData, null));
    }
    
    if (!subValidate) {
      const errorData = {
        errors: {
          submenuID: ["Submenu not found"],
        },
      };
    
      return res.status(400).send(responseHelper.ResponseData(false, "Bad Request", errorData, null));
    }
    
    next();    
  } catch (error: any) {
    return res
      .status(500)
      .send(responseHelper.ResponseData(false, "", error, null));
  }
};
