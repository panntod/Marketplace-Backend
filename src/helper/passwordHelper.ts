import bcrypt from "bcrypt"

export const PasswordHashing = async(password: string): Promise<string> =>{
    const result = await bcrypt.hash(password, 10)
    return result
}

export const PasswordCompare = async(password: string, passwordHash: string): Promise<boolean> => {
    const match = await bcrypt.compare(password, passwordHash)
    return match
}