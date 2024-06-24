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
        if(!pageName || pageName === "concept"){
            const assetList: any[] = await AssetContent.find({}).select('tags')
            assetList.forEach(assetTags => {
                tagList.concat(assetTags)
            })
        }
        if(!pageName || pageName === "assets"){
            const conceptList: any[] = await ConceptContent.find({}).select('title')
            conceptList.forEach(conceptTags => {
                tagList.concat(conceptTags)
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