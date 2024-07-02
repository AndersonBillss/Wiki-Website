import { httpResponse } from '../../models';
import AssetContent from '../models/assetContents';
import ConceptContent from '../models/conceptContents';
import getTagList from './getTagList';

export default async function getImage(pageName: string, _id: string, resolution?: string): Promise<httpResponse> {
    let image: any
    let tagsResponse: httpResponse = await getTagList(pageName)
    const tags = tagsResponse.data.tags
    if(pageName === "assets"){
        image = await AssetContent.findOne({ _id }).select('highResSrc title tags');
    }
    if(pageName === "concept"){
        image = await ConceptContent.findOne({ _id }).select('highResSrc title tags');
    }

    if(!image){
        return{
            status: 400,
            data: {
                success: true,
                msg: "Img does not exist!"
            }
        }
    } else {
        return{
            status: 200,
            data: {
                success: true,
                image: image,
                tags: tags
            }
        }
    }

}