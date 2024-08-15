import addImage from "../db/image/addImage";

export default async function handleUploadImage(req: any, res: any){
    const file = req.body;

    const result = await addImage(file)
    res.status(result.status).send(result.data)
    
}