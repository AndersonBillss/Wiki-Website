import { httpResponse } from "../models"
import getImageArray from "../db/image/getImageArray"
import getImage from "../db/image/getImage"

export default async function handleGetImage(req: any, res: any){
    const page = req.query.pageName
    const id = req.query.id
    if(typeof(page) !== 'string'){
        res.status(400).send({
            msg: 'pageName must be a string'
        })
    } else if(typeof(id) !== 'string'){
        res.status(400).send({
            msg: 'id must be a string'
        })
    }else {
        let result: httpResponse
        const resolution = req.query.resolution
        if(resolution === "med"){
            result = await getImageArray([{pageName: page, _id: id}])
            result.data.images = result.data.images[0]
        } else {
            result = await getImage(page, id)
        }
        res.status(result.status).send(result.data)
    }
}