import { httpResponse } from '../../models';
import { removeImage } from '../../utils/multer';
import ConceptContent from '../models/conceptContents';

export default async function deleteImage(_id: string): Promise<httpResponse> {
    try{
        await ConceptContent.deleteMany({ _id })
        removeImage("concept", _id)
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