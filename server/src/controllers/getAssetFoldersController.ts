import AssetContent from "../db/models/assetContents";

export default async function handleGetAssetFolders(req: any, res: any){
    try{
        const response = await AssetContent.find({})
        res.status(200).send({
            data: response
        })
    } catch(err){
        console.error(err)
        res.status(500).send({
            msg: "internal server error"
        })
    }
}