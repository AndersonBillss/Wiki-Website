import AssetContent from "../db/models/assetContents";

export default async function handleGetAssetFolderContents(req: any, res: any){
    const title = req.query.title
    if(!title || !(typeof(title) === 'string')){
        res.status(400).send({
            success: false,
            msg: 'page name is not a string'
        })
        return
    }

    try{
        const response = await AssetContent.find({ title })
        res.status(200).send(response[0])
    } catch(err){
        console.error(err)
        res.status(500).send({
            msg: "internal server error"
        })
    }
}