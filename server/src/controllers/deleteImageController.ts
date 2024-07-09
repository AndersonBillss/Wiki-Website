import deleteImage from "../db/image/deleteImage"

export default async function handleDeleteImage(req: any, res: any){
    const pageName = `${req.query.pageName}`
    const id = `${req.query.id}`
    const result = await deleteImage(pageName, id)
    res.status(result.status).send(result.data)
}
