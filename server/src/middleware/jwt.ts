import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
import { httpResponse } from '../models';
dotenv.config()

const secretKey = process.env.JWT_SECRET || "Test secret key"

export function generateToken(_id: string, userName: string){
    const jwtPayload = {
        _id: _id,
        userName: userName
    }
    const token = jwt.sign(jwtPayload, secretKey)
    return token
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

export function getUserName(req: Request): string | undefined | null{
    const authorization = req.headers['authorization'];
    let token: string | undefined = undefined
    let userName: string | undefined | null = undefined
    if(authorization){
        token = authorization.split(' ')[1]
        const decoded: any = jwt.decode(token)
        userName = decoded?.userName
    }

    return userName
}