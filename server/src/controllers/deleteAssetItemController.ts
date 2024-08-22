import AssetContent from "../db/models/assetContents"
import { ObjectId } from 'mongodb';
import { removeImage } from "../utils/upload";

export default async function handleDeleteAssetItem(req: any, res: any){
    const title = req.query.title
    const itemId = req.query.itemId

    if(!title || typeof(title) !== "string"){
        res.status(400).send("invalid title")
        return
    }
    if(!itemId || typeof(itemId) !== "string"){
        res.status(400).send("invalid item id")
        return
    }

    const fullItem = await AssetContent.findOne(
        { title: title },
        { contents: { $elemMatch: { _id: new ObjectId(itemId) } } } 
    )
    const itemType = fullItem?.contents[0].type

    if(fullItem?.contents[0]._id.toHexString() !== itemId){
        res.status(400).send("Failed to find the desired item")
        return
    }
      
    const result = await AssetContent.updateOne(
        { title: title },
        { 
            $pull: { 
            contents: { _id: new ObjectId(itemId) }
            }
        }
    )
    if(!result.acknowledged){
        res.status(500).send("Error deleting document")
        return
    }
    removeImage(`/assets/${title}/${itemType}`, itemId)

    const response = await AssetContent.find({ title })
    res.status(200).send(response[0])
}
