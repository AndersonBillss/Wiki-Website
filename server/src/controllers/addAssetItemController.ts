import AssetContent from "../db/models/assetContents"
import base64ImageToPng from "../utils/base64ImageToPng"
import createSpriteSheet from "../utils/createSpriteSheet"
import { ObjectId } from 'mongodb';
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

        const spriteSheetFrames: number = imageArray.length
        const spriteSheet = await createSpriteSheet(imageArray)
        const spriteSheetId = new ObjectId()
        const spriteSheetObject = {
            type: "animation",
            title: itemObject.title,
            _id: spriteSheetId,
            spriteSheetFrames: spriteSheetFrames
        }
        if(spriteSheet){
            uploadImage(`/assets/${assetFolder}/animation`, spriteSheetId.toHexString(), spriteSheet)
            await AssetContent.updateOne(
                { title: assetFolder },
                { $push: { contents: spriteSheetObject } }
            );
            const result = await AssetContent.find({ title: assetFolder })
            res.status(200).send(result[0])
        } else {
            res.status(400).send(
                {
                success: false,
                msg: 'could not create a spritesheet with those images'
                }
            )
        }

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