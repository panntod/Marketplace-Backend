import { Request, Response } from "express";
import { Op } from "sequelize";
import User from "../db/models/user";
import ResponseHelper from "../helper/responseHelper";
import * as PasswordHelper from "../helper/passwordHelper";
import Role from "../db/models/role";
import RoleMenuAccess from "../db/models/rolemenuaccess";
import MasterMenu from "../db/models/mastermenu";
import SubMenu from "../db/models/submenu";

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password } = req.body;

    const hashed = await PasswordHelper.PasswordHashing(password);

    const result = await User.create({
      name,
      email,
      password: hashed,
      active: true,
      verified: true,
      roleID: 3,
    });

    return res.status(201).send(
      ResponseHelper.ResponseData(true, "User has been inserted", null, {
        name,
        email,
        active: true,
        verified: true,
        roleID: 3,
      })
    );
  } catch (error: any) {
    return res
      .status(500)
      .send(ResponseHelper.ResponseData(false, "", error, null));
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idUser = req.params.id;

  try {
    const { email, password } = req.body;

    const hashed = await PasswordHelper.PasswordHashing(password);

    const result = await User.update(
      {
        email,
        password: hashed,
      },
      { where: { id: idUser } }
    );

    return res.status(201).send(
      ResponseHelper.ResponseData(true, "User Data has been updated", null, {
        email,
        password,
      })
    );
  } catch (error: any) {
    return res
      .status(500)
      .send(ResponseHelper.ResponseData(false, "", error, null));
  }
};

export const changePassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password, newPassword } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res
        .status(401)
        .send(ResponseHelper.ResponseData(false, "User Not Found", null, null));
    }

    const matched = await PasswordHelper.PasswordCompare(
      password,
      user.password
    );

    if (!matched) {
      return res
        .status(401)
        .send(
          ResponseHelper.ResponseData(false, "Incorrect Password", null, null)
        );
    }

    const hashed = await PasswordHelper.PasswordHashing(newPassword);

    const result = await User.update(
      {
        password: hashed,
      },
      { where: { email: email } }
    );

    return res.status(200).send(
      ResponseHelper.ResponseData(true, "Change Password succesfully", null, {
        name: user.name,
        email: user.email,
        roleID: user.roleID,
      })
    );
  } catch (error: any) {
    return res
      .status(500)
      .send(ResponseHelper.ResponseData(false, "", error, null));
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res
        .status(401)
        .send(
          ResponseHelper.ResponseData(
            false,
            "Unauthorized",
            "User Not Found",
            null
          )
        );
    }

    const matched = await PasswordHelper.PasswordCompare(
      password,
      user.password
    );

    if (!matched) {
      return res
        .status(401)
        .send(
          ResponseHelper.ResponseData(false, "Incorrect Password", null, null)
        );
    }

    const dataUser = {
      name: user.name,
      email: user.email,
      role: user.roleID,
      active: user.active,
      verified: user.verified,
    };

    const token = ResponseHelper.GenerateToken(dataUser);
    const refreshToken = ResponseHelper.GenerateRefreshToken(dataUser);

    user.accessToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const roleAccess = await RoleMenuAccess.findAll({
      where: {
        roleID: user.roleID,
        active: true,
      },
    });

    const listSubmenuID = roleAccess.map((accessData) => {
      return accessData.submenuID;
    });

    const menuAccess = await MasterMenu.findAll({
      where: {
        active: true,
      },
      order: [
        ["ordering", "ASC"],
        [SubMenu, "ordering", "ASC"],
      ],
      include: {
        model: SubMenu,
        where: {
          id: { [Op.in]: listSubmenuID },
        },
      },
    });

    const responseUser = {
      name: user.name,
      email: user.email,
      role: user.roleID,
      active: user.active,
      verified: user.verified,
      token: token,
      menuAccess: menuAccess,
    };

    return res
      .status(200)
      .send(
        ResponseHelper.ResponseData(
          true,
          "Login succesfully",
          null,
          responseUser
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

export const RefreshToken = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res
        .status(404)
        .send(
          ResponseHelper.ResponseData(
            false,
            "Refresh token is not found",
            null,
            null
          )
        );
    }

    const decodedUser = ResponseHelper.ExtractRefreshToken(refreshToken);
    if (!decodedUser) {
      return res
        .status(401)
        .send(
          ResponseHelper.ResponseData(false, "Cant decoded token", null, null)
        );
    }

    const token = ResponseHelper.GenerateToken({
      name: decodedUser.name,
      email: decodedUser.email,
      roleID: decodedUser.role,
      verified: decodedUser.verified,
      active: decodedUser.active,
    });

    return res
      .status(200)
      .send(
        ResponseHelper.ResponseData(
          true,
          "Refresh token succesfully generate",
          null,
          { token: token }
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

export const UserDetail = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const email = res.locals.userEmail;

    const existingUser = await User.findOne({
      where: { email: email },
      include: { model: Role, attributes: ["id", "roleName"] },
    });

    if (!existingUser) {
      return res
        .status(404)
        .send(ResponseHelper.ResponseData(false, "User not found", null, null));
    }

    existingUser.password = existingUser.accessToken =
      "You cannot access this data";

    return res
      .status(200)
      .send(
        ResponseHelper.ResponseData(true, "User Found", null, existingUser)
      );
  } catch (error: any) {
    return res
      .status(500)
      .send(
        ResponseHelper.ResponseData(false, "Internal Server Error", error, null)
      );
  }
};

export const userLogout = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res
        .status(200)
        .send(ResponseHelper.ResponseData(true, "User Logout", null, null));
    }

    const email = res.locals.userEmail;

    const existingUser = await User.findOne({ where: { email: email } });

    if (!existingUser) {
      res.clearCookie("refreshToken");
      return res
        .status(200)
        .send(ResponseHelper.ResponseData(true, "User Logout", null, null));
    }

    await User.update({ accessToken: null }, { where: { email: email } });
    res.clearCookie("refreshToken");

    return res
      .status(200)
      .send(ResponseHelper.ResponseData(true, "User Logout", null, null));
  } catch (error: any) {
    return res
      .status(500)
      .send(
        ResponseHelper.ResponseData(false, "Internal Server Error", error, null)
      );
  }
};
