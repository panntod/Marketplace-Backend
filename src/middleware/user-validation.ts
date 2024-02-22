import Validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import responseHelper from "../helper/responseHelper";
import User from "../db/models/user";

export const RegisterValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const userData = {
      name,
      email,
      password,
      confirmPassword,
    };

    const rules: Validator.Rules = {
      name: "required|string|max:50",
      email: "required|email",
      password: "required|min:8|alpha_num",
      confirmPassword: "required|same:password",
    };

    const validate = new Validator(userData, rules);

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

    const user = await User.findOne({
      where: {
        email: userData.email,
      },
    });

    if (user) {
        const errorMessage = {
            errors: {
                email: [
                    "Email already Used"
                ]
            }
        }
      return res
        .status(400)
        .send(
          responseHelper.ResponseData(
            false,
            "bad request",
            errorMessage,
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
