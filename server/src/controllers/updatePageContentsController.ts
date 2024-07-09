import updatePageContents from "../db/page/updatePageContents"

export default async function handleUpdatePageContents(req: any, res: any){
    const response = await updatePageContents(req.body)
    res.status(response.status).json(response.data)
}