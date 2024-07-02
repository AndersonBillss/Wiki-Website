import { httpResponse } from '../../models';
import AssetContent from '../models/assetContents';
import ConceptContent from '../models/conceptContents';

export default async function deleteImage(pageName: string, _id: string): Promise<httpResponse> {
    if(pageName === "assets"){
        await AssetContent.deleteMany({ _id })
    }
    if(pageName === "concept"){
        await ConceptContent.deleteMany({ _id })
    }

    try{
        return {
            status: 200,
            data: {
                success: true,
                msg: "Successfully deleted image"
            }
        }
    } catch(err){

        return {
            status: 500,
            data: {
                success: true,
                msg: "Internal server error"
            }
        }
    }

}