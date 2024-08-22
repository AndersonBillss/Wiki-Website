import AssetContent from "../db/models/assetContents";
import { removeFolder } from "../utils/upload";

export default async function handleDeleteAssetFolder(req: any, res: any){
    const title = req.query.title
    if(!title || typeof(title) !== 'string'){
        res.status(400).send({msg: "Invalid folder title"})
    }
    const targetFolder = (await AssetContent.find({ title }))[0]
    const folderExists = targetFolder.contents !== undefined
    if(!folderExists){
        res.status(400).send({msg: "No such folder exists"})
        return
    }

    const hasContents: boolean = targetFolder.contents.length > 0
    if(hasContents){
        res.status(400).send({msg: "Cannot delete this folder unless it is empty"})
        return
    }

    await AssetContent.deleteOne({ title })
    removeFolder(`/assets/${title}`)

    res.status(200).send({msg: `Deleted asset folder: ${title}`})
}