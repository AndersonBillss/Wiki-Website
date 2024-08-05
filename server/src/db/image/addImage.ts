import AssetContent from '../models/assetContents';
import ConceptContent from '../models/conceptContents';
import getImageObject from '../../utils/getImageObject';

import getImages from './getImages';
import { httpResponse } from '../../models';

export default async function addImage(pageName: string, newContents: any): Promise<httpResponse>{
    newContents.tags = JSON.parse(newContents.tags)


    if(new Set(newContents.tags).size !== newContents.tags.length){
        return{
            status: 400,
            data: {
                success: false,
                msg: 'Img tags cannot have duplicates'
            }
        }
    
    }


    try {
      const imgObjectData = await getImageObject(newContents)
        if(!imgObjectData.data.success){
            return imgObjectData
        }
        const imgObject = imgObjectData.data.img

        let saveResult: any
        if(pageName === 'assets'){
            try{
                const title = imgObject!.title
    
                const imageWithSameTitle = await AssetContent.findOne({ title });
                if(imageWithSameTitle){
                    saveResult = {
                        status: 200,
                        data: { 
                            msg: "Image with title already exists" ,
                            success: true
                        }
                    }
                } else {
                    await AssetContent.insertMany(imgObject);
                    const updatedImages = await getImages('assets')
                    saveResult = {
                        status: 200,
                        data: {
                            msg: 'Successfully uploaded file',
                            images: updatedImages.data.images,
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
    

        } else if(pageName === 'concept'){
            try {
                const title = imgObject!.title
    
                const imageWithSameTitle = await ConceptContent.findOne({ title });
                if(imageWithSameTitle){
                    saveResult = {
                        status: 200,
                        data: { 
                            msg: "Image with title already exists" ,
                            success: true
                        }
                    }
                } else {
                    await ConceptContent.insertMany(imgObject);
                    const updatedImages = await getImages('concept')
                    saveResult = {
                        status: 200,
                        data: {
                            msg: 'Successfully uploaded file',
                            images: updatedImages.data.images,
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
                            msg: 'Error saving contents',
                            success: false
                        },
                    }
                );
            }
        } else {
            saveResult = {
                    status: 400,
                    data: { 
                        msg: 'Specified page does not exist',
                        success: false
                    },
                }
        
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