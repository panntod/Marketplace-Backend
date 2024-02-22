import { Response, Request, NextFunction } from "express";
import ResponseHelper from "../helper/responseHelper";
import jwt from 'jsonwebtoken';


const Authenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.headers["authorization"];
    const token = authToken && authToken.split(" ")[1];

    if (!token) {
      return res
      .status(401)
      .send(ResponseHelper.ResponseData(false, "Invalid Token", null, null));
    }
    
    const decodedToken = jwt.decode(token, { complete: true }) as { [key: string]: any };
    const expirationTime = decodedToken?.payload?.exp;

    if (expirationTime && Date.now() >= expirationTime * 1000) {
      return res
        .status(401)
        .send(ResponseHelper.ResponseData(false, "Token has expired", null, null));
    }

    const result = ResponseHelper.ExtractToken(token);

    if (!result) {
      return res
        .status(401)
        .send(ResponseHelper.ResponseData(false, "Unauthorized", null, null));
    }

    res.locals.userEmail = result?.email;
    res.locals.roleID = result?.role;
    next();
  } catch (error: any) {
    next(error);
  }
};

const SuperAdminOnly = (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleID = res.locals.roleID;

    if (roleID !== 1) {
      return res
        .status(403)
        .send(
          ResponseHelper.ResponseData(
            false,
            "Only Super Admin can access this data",
            null,
            null
          )
        );
    }

    next();
  } catch (error: any) {
    next(error);
  }
};

const AdminOnly = (req: Request, res: Response, next: NextFunction) => {
  try {
    const roleID = res.locals.roleID;
    if (roleID !== 1 && roleID !== 2) {
      return res
        .status(403)
        .send(
          ResponseHelper.ResponseData(
            false,
            "Only admin can access this data",
            null,
            null
          )
        );
    }

    next();
  } catch (error: any) {
    next(error);
  }
};

export default { Authenticated, SuperAdminOnly, AdminOnly };
