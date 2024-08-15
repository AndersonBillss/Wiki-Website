import ConceptContent from '../models/conceptContents';

import getImage from './getImage';
import { httpResponse } from '../../models';

export default async function updateImage(newImageData: any): Promise<httpResponse>{

    if(new Set(newImageData.tags).size !== newImageData.tags.length){
        return{
            status: 400,
            data: {
                success: false,
                msg: 'Img tags cannot have duplicates'
            }
        }
    
    }


    try {
        let saveResult: any
            try{
                const title = newImageData.title
    
                const imageWithSameTitle: any = await ConceptContent.findOne({ title });
                let duplicateId = imageWithSameTitle?._id.toHexString()
                if(duplicateId && duplicateId !== newImageData._id){
                    saveResult = {
                        status: 200,
                        data: { 
                            msg: "Image with title already exists" ,
                            success: true
                        }
                    }
                } else {
                    const update = {
                        $set: {
                          title: newImageData.title,
                          tags: newImageData.tags
                        }
                    };
                    await ConceptContent.updateOne({_id: newImageData._id}, update);
                    const updatedImage = await getImage(newImageData._id)
                    
                    saveResult = {
                        status: 200,
                        data: {
                            msg: 'Successfully updated file',
                            image: updatedImage.data.image,
                            success: true
                        }
                    };
                }
        
            } catch (err) {
                console.error(err)
                saveResult = (
                    {
                        status: 500,
                        data: { 
                            msg: 'Error saving contents' ,
                            success: false
                        }
                    }
                );
            }


        return saveResult

        
    } catch (error) {
        console.error('Error processing image:', error);
        return {
            status: 500,
            data: {
                msg: 'Error processing image.',
                success: false
            }
        };
    }
}