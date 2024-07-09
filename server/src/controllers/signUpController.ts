import signUp from "../db/user/signUp"

export default async function handleSignUp(req: any, res: any){
    const userName = req.body.userName
    const result = await signUp(userName)
    res.status(result.status).send(result.data)
}