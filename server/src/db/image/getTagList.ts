import ConceptContent from '../models/conceptContents';
import AssetContent from '../models/assetContents';
import { httpResponse } from '../../models';

export default async function getTagList(pageName?: string | undefined): Promise<httpResponse>{
    try{
        if(pageName && pageName !== "concept" && pageName !== "assets"){
            return{
                status: 400,
                data: {
                    msg: "Invalid page name"
                }
            }
        }

        let tagList: any[] = []
        if(!pageName || pageName === "assets"){
            const assetList: any[] = await AssetContent.find({}).select('tags')
            assetList.forEach(assetImg => {
                tagList = tagList.concat(assetImg.tags)
            })
        }
        if(!pageName || pageName === "concept"){
            const conceptList: any[] = await ConceptContent.find({}).select('tags')
            conceptList.forEach(conceptImg => {
                tagList = tagList.concat(conceptImg.tags)
            })
        }
        const uniqueTags = [... new Set(tagList)]

        return{
            status: 200,
            data: {
                msg: "Successfully retrieved tags",
                tags: uniqueTags
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