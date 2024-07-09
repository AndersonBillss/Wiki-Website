import updateImage from "../db/image/updateImage";

export default async function handleUpdateImage(req: any, res: any){
    const page = req.query.pageName
    if(typeof(page) !== 'string'){
        res.status(400).send({
            msg: 'pageName must be a string'
        })
    } else {
        const file = req.body;
        const result = await updateImage(page, file)
        res.status(result.status).send(result.data)
    }
}