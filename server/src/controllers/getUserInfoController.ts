import { getUserName } from "../middleware/jwt"

export default async function handleGetUserInfo(req: any, res: any){
    const userName = getUserName(req)
    if(userName){
        res.status(200).send({
            success: true,
            msg: 'User data retrieved successfully',
            userName: userName
        })
    } else {
        res.status(400).send({
            success: true,
            msg: 'Username does not exist in token',
        })
    }
}