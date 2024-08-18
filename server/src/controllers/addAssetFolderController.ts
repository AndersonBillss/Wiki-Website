import AssetContent from "../db/models/assetContents"

export default async function handleAddAssetFolder(req: any, res: any){
    const assetFolder = req.body.assetFolder
    if(!assetFolder){
        res.status(400).send({
            msg: "no title provided"
        })
        return
    }
    const duplicateNames = await AssetContent.find({title: assetFolder.title})
    if(duplicateNames.length > 0){
        res.status(400).send({
            msg: "This would be a duplicate name"
        })
        return
    }
    try{
        await AssetContent.insertMany(assetFolder)
        const newContents = await AssetContent.find({})
        res.status(200).send({
            data: newContents
        })
    } catch(err){
        res.status(500).send({
            msg: "Internal server error"
        })
    }

}