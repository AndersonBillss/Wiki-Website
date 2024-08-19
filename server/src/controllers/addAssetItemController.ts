import { title } from "process"
import AssetContent from "../db/models/assetContents"
import base64ImageToPng from "../utils/base64ImageToPng"
import createSpriteSheet from "../utils/createSpriteSheet"
import { uploadImage } from "../utils/upload"

export default async function handleAddAssetItem(req: any, res: any){
    const assetFolder = req.query.title
    const itemObject = req.body

    if(!itemObject.title || !(typeof(itemObject.title) === "string")){
        res.status(400).send(
            {
            success: false,
            msg: 'No title in item'
            }
        )
        return
    }


    if(itemObject.type === "Animation"){
        const animationObject = {
            type: "Animation",
            title: itemObject.title,
        }

        itemObject.srcArray = JSON.parse(itemObject.srcArray)
        if(!Array.isArray(itemObject.srcArray) || itemObject.srcArray.length === 0){
            res.status(400).send(
                {
                success: false,
                msg: 'invalid src array'
                }
            )
            return
        }
        
        const imageArray = await Promise.all(itemObject.srcArray.map((image: string) => base64ImageToPng(image)))
        
        for(const image of imageArray){
            if(!Buffer.isBuffer(image)){
                res.status(400).send(
                    {
                    success: false,
                    msg: 'Some images are invalid'
                    }
                )
                return
            }
        }

        const spriteSheet = createSpriteSheet(imageArray)
        uploadImage("/assets/animation", "new animation", spriteSheet)

    } else if(itemObject.type === "Image"){
        if(!itemObject.src){
            res.status(400).send(
                {
                success: false,
                msg: 'invalid image src'
                }
            )
            return
        }
    }


}