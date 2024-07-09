import logIn from "../db/user/logIn"

export default async function handleLogIn(req: any, res: any){
    const userName = req.body.userName
    const result = await logIn(userName)
    res.status(result.status).send(result.data)
}