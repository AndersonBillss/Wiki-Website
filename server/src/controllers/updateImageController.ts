import updateImage from "../db/image/updateImage";

export default async function handleUpdateImage(req: any, res: any){
        const file = req.body;
        const result = await updateImage(file)
        res.status(result.status).send(result.data)
}