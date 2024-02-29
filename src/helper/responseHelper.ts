import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ResponseData = (
  success: boolean,
  message: string | null,
  error: any | null,
  data: any | null
) => {
  if (error != null && error instanceof Error) {
    const response = {
      success: false,
      message: error.message,
      errors: error,
      data,
    };

    return response;
  }

  const res = {
    success,
    message,
    errors: error,
    data: data,
  };

  return res;
};

const GenerateToken = (data: any): string => {
  const token = jwt.sign(data, process.env.JWT_TOKEN as string, {
    expiresIn: "1h",
  });

  return token;
};

const GenerateRefreshToken = (data: any): string => {
  const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN as string, {
    expiresIn: "1d",
  });

  return token;
};

interface UserData {
  name: string | null;
  email: string | null;
  role: number | null;
  verified: boolean | null;
  active: boolean | null;
}

const extractToken = (token: string, secretKey: string): UserData | null => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded as UserData;
  } catch (err: any) {
    console.error(`Token verification failed for ${secretKey}:`, err.message);
    return null;
  }
};

export const ExtractToken = (token: string): UserData | null => {
  const secretKey = process.env.JWT_TOKEN as string;
  return extractToken(token, secretKey);
};

export const ExtractRefreshToken = (token: string): UserData | null => {
  const secretKey = process.env.JWT_REFRESH_TOKEN as string;
  return extractToken(token, secretKey);
};

export default {
  ResponseData,
  GenerateToken,
  GenerateRefreshToken,
  ExtractToken,
  ExtractRefreshToken,
};
