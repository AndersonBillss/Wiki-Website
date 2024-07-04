import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
dotenv.config()

const secretKey = process.env.JWT_SECRET || "Test secret key"

export function generateToken(_id: string, userName: string){
    const jwtPayload = {
        _id: _id,
        userName: userName
    }
    const token = jwt.sign(jwtPayload, secretKey, {expiresIn: 2000})
    return token
}



interface JwtPayload {
    userId: string;
    email: string;
}


export function verifyToken(req: Request, res: Response, next: NextFunction){
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        next();
    });
}