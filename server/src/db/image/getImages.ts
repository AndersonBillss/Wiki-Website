import { httpResponse } from '../../models';
import ConceptContent from '../models/conceptContents';

export default async function getImages(): Promise<httpResponse> {
    try{
        const images = await ConceptContent.find({}).select('_id title tags')

        return{
            status: 200,
            data: {
                msg: 'getImages Works!',
                images: images
            }
        }

    } catch(err){
        console.log(err)
        return{
            status: 500,
            data: {
                msg: 'internal server error'
            }
        }
    }

}