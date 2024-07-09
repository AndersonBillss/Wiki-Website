import getImageList from "../db/image/getImageList"

export default async function handleImageList(req: any, res: any){
    const pageName = `${req.query.pageName}`
    const result = await getImageList(pageName)
    res.send(result)
}