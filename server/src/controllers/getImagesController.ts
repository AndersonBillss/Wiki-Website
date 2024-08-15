import getImages from "../db/image/getImages"

export default async function handleGetImages(req: any, res: any){
    const result = await getImages()
    res.status(result.status).send(result.data)
}