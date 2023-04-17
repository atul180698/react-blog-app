import bcrypt, { genSalt } from 'bcrypt'

//Convert password to hashed string
export const hashPassword = async (password) => {
    try {
        const salt = await genSalt(10)
        const secPass = await bcrypt.hash(password, salt)
        return secPass
    } catch (error) {
        console.log(error)
    }
}

//Compare password for validation
export const comparePassword = async (password, secPass) => {
    const result = await bcrypt.compare(password, secPass)
    return result
}