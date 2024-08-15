import { httpResponse } from '../../models';
import ConceptContent from '../models/conceptContents';
import getTagList from './getTagList';

export default async function getImage(_id: string): Promise<httpResponse> {
    let image: any
    let tagsResponse: httpResponse = await getTagList()
    const tags = tagsResponse.data.tags

    image = await ConceptContent.findOne({ _id }).select('title tags');

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