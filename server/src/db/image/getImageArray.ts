import ConceptContent from '../models/conceptContents';
import AssetContent from '../models/assetContents';
import { httpResponse } from '../../models';

export default async function getImageArray(imageLocationArray: any[]): Promise<httpResponse>{
    try{
        const imageList = await getImages(imageLocationArray)

        return{
            status: 200,
            data: {
                success: true,
                images: imageList
            }
        }
    } catch(err){
        console.error(err)
        return{
            status: 200,
            data: {
                success: false,
                msg: 'Internal server error'
            }
        }
    }

}

async function getImages(imageLocationArray: any[]){
    const imageListPromises = imageLocationArray.map(async (imageLocation) => {
        const _id = imageLocation._id;
        if (imageLocation.pageName === "assets" && _id) {
            return AssetContent.findOne({ _id }).select('_id, medResSrc').exec();
        } else if (imageLocation.pageName === "concept" && _id) {
            return ConceptContent.findOne({ _id }).select('_id, medResSrc').exec()
        }
        return null;
    });

    const imageList = (await Promise.all(imageListPromises)).filter(img => img !== null);

    return imageList;
}