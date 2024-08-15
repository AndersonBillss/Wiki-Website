import getImageList from "../db/image/getImageList"

export default async function handleImageList(req: any, res: any){
    const result = await getImageList()
    res.send(result)
}