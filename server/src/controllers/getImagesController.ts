import getImages from "../db/image/getImages"

export default async function handleGetImages(req: any, res: any){
    const page = req.query.pageName
    if(typeof(page) !== 'string'){
        res.status(400).send({
            msg: 'pageName must be a string'
        })
    } else {
        const result = await getImages(page)
        res.status(result.status).send(result.data)
    }
}