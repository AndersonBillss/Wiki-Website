import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const mongoURI = process.env.JWT_SECRET

export function generateToken(){
    console.log(mongoURI)
}
