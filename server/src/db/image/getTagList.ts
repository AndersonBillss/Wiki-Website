import ConceptContent from '../models/conceptContents';
import { httpResponse } from '../../models';

export default async function getTagList(): Promise<httpResponse>{
    try{
        let tagList: any[] = []

        const conceptList: any[] = await ConceptContent.find({}).select('tags')
        conceptList.forEach(conceptImg => {
            tagList = tagList.concat(conceptImg.tags)
        })
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