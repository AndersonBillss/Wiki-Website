import ConceptContent from '../models/conceptContents';
import AssetContent from '../models/assetContents';
import { httpResponse } from '../../models';

export default async function getImageList(pageName?: string | undefined): Promise<httpResponse>{
    try{
        if(pageName && pageName !== "concept" && pageName !== "assets"){
            return{
                status: 400,
                data: {
                    msg: "Invalid page name"
                }
            }
        }
        let imageTitleList: any[] = []
        if(!pageName || pageName === "assets"){
            const assetList: any[] = await AssetContent.find({}).select('title')
            imageTitleList.concat(assetList)
        }
        if(!pageName || pageName === "concept"){
            const conceptList: any[] = await ConceptContent.find({}).select('title')
            imageTitleList.concat(conceptList)
        }
        imageTitleList.sort()

        return{
            status: 200,
            data: {
                msg: "Successfully retrieved image list",
                imageList: imageTitleList
            }
        }
    }catch(err){
        console.error(err)
        return{
            status: 500,
            data: {
                msg: "Internal Server Error"
            }
        }
    }
}