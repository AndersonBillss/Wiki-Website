import ConceptContent from '../models/conceptContents';
import { httpResponse } from '../../models';

export default async function getImageArray(imageIdArray: string[]): Promise<httpResponse>{
    try{
        const imageList = await getImages(imageIdArray)

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

async function getImages(imageIdArray: any[]){
    const imageListPromises = imageIdArray.map(async (_id) => {
        return ConceptContent.findOne({ _id }).select('_id').exec()
    });

    const imageList = (await Promise.all(imageListPromises)).filter(img => img !== null);

    return imageList;
}