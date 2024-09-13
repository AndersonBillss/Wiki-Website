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

    const folder = await AssetContent.find({title: assetFolder})
    const duplicatesFound = folder[0].contents.find(_ => _.title === itemObject.title) !== undefined
    if(duplicatesFound){
        res.status(400).send(
            {
            msg: 'Duplicate item names found'
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

        const spriteSheetResult = await createSpriteSheet(imageArray)
        const spriteSheetFrames = spriteSheetResult?.frames
        const spriteSheet = spriteSheetResult?.buffer

        const spriteSheetId = new ObjectId()
        const spriteSheetObject = {
            type: "animation",
            title: itemObject.title,
            _id: spriteSheetId,
            spriteSheetFrames: spriteSheetFrames
        }
        if(spriteSheet && spriteSheetFrames !== undefined){
            uploadImage(`/assets/${assetFolder}/animation`, spriteSheetId.toHexString(), spriteSheet)
            await AssetContent.updateOne(
                { title: assetFolder },
                { $push: { contents: spriteSheetObject } }
            );
            const result = await AssetContent.find({ title: assetFolder })
            res.status(200).send(result[0])
            return
        } else {
            res.status(400).send(
                {
                success: false,
                msg: 'could not create a spritesheet with those images'
                }
            )
            return
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

        const pngImage = await base64ImageToPng(itemObject.src)
        if(!pngImage){
            res.status(400).send(
                {
                success: false,
                msg: 'invalid image type'
                }
            )
            return
        }

        const imgId = new ObjectId()
        uploadImage(`/assets/${assetFolder}/image`, imgId.toHexString(), pngImage)

        const spriteSheetObject = {
            type: "image",
            title: itemObject.title,
            _id: imgId,
        }

        await AssetContent.updateOne(
            { title: assetFolder },
            { $push: { contents: spriteSheetObject } }
        );

        const result = await AssetContent.find({ title: assetFolder })
        res.status(200).send(result[0])
        return
    }


}