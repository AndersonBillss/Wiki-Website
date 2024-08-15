import getTagList from "../db/image/getTagList"

export default async function handleGetTags(req: any, res: any){
    const result = await getTagList()
    res.send(result)
}