import { httpResponse } from "../models"
import getImageArray from "../db/image/getImageArray"
import getImage from "../db/image/getImage"

export default async function handleGetImage(req: any, res: any){
    const id = req.query.id

    if(!id){
        res.status(400).send({
            msg: 'id paramter needed'
        })
        return
    }
    if(typeof(id) !== 'string'){
        res.status(400).send({
            msg: 'id must be a string'
        })
        return
    } else {
        let result: httpResponse
        const resolution = req.query.resolution
        if(resolution === "med"){
            result = await getImageArray([id])
            result.data.images = result.data.images[0]
        } else {
            result = await getImage(id)
        }
        res.status(result.status).send(result.data)
    }
}