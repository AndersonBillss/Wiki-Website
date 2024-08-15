import deleteImage from "../db/image/deleteImage"

export default async function handleDeleteImage(req: any, res: any){
    const id = `${req.query.id}`
    const result = await deleteImage(id)
    res.status(result.status).send(result.data)
}
