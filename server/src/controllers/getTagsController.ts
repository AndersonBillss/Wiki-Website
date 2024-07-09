import getTagList from "../db/image/getTagList"

export default async function handleGetTags(req: any, res: any){
    const pageName = `${req.query.pageName}`
    const result = await getTagList(pageName)
    res.send(result)
}