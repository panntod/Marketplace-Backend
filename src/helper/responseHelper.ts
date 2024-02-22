import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

const ResponseData = ( success: boolean, message: string | null, error: any | null, data: any | null) => {
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
		data: data
  };

  return res
};

const GenerateToken = (data: any): string => {
    const token = jwt.sign(data, process.env.JWT_TOKEN as string, { expiresIn: "1h" })

    return token
}

const GenerateRefreshToken = (data: any): string => {
    const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN as string, { expiresIn: "1d" })

    return token
}

interface UserData {
  name: string | null,
  email: string | null,
  role: number | null,
  verified: boolean | null,
  active: boolean | null
}

const ExtractToken = (token: string): UserData | null => {
  const secretKey = process.env.JWT_TOKEN  as string

  let responseData: any 

  const res = jwt.verify(token, secretKey, (err, decoded) => {
    if(err) {
      responseData = null
    }

    responseData = decoded
  })

  if (responseData) {
    const result: UserData = <UserData> (responseData)
    return result
  }
  return null
}

const ExtractRefreshToken = (token: string): UserData | null => {
  const secretKey = process.env.JWT_REFRESH_TOKEN  as string

  let responseData: any 

  const res = jwt.verify(token, secretKey, (err, decoded) => {
    if(err) {
      responseData = null
    }

    responseData = decoded
  })

  if (responseData) {
    const result: UserData = <UserData> (responseData)
    return result
  }
  return null
}

export default { ResponseData, GenerateToken, GenerateRefreshToken, ExtractToken, ExtractRefreshToken }