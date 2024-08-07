import AssetContent from '../models/assetContents';
import ConceptContent from '../models/conceptContents';
import getImageObject from '../../utils/getImageObject';

import getImages from './getImages';
import { httpResponse } from '../../models';
import { uploadImage } from '../../utils/multer';


export default async function addImage(pageName: string, newContents: any): Promise<httpResponse>{
    newContents.tags = JSON.parse(newContents.tags)
    const imageObjectData: any = await getImageObject(newContents)
    let imageInfo: any


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
        if(!imageObjectData.data.success){
            return imageObjectData
        }
        const imgObject = {
            title: imageObjectData.data.img.title,
            tags: imageObjectData.data.img.tags
        }

        let saveResult: any

        try{

            if(pageName === 'assets'){
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
                    imageInfo = await AssetContent.insertMany(imgObject);
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

            } else if(pageName === 'concept'){
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
                    imageInfo = await ConceptContent.insertMany(imgObject);
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
            } else {
                return {
                    status: 400,
                    data: {
                        msg: 'Invalid page name!',
                        success: false
                    }
                }
            }
        


            if(!imageInfo){
                return {
                    status: 500,
                    data: {
                        msg: 'Error processing image. Please ask admin to look at the database',
                        success: false
                    }
                }
            }
            const imageId = imageInfo[0]._id.toString()
            try{
                uploadImage(pageName, imageId, imageObjectData.data.img.src)
            } catch(err){
                console.error("Error while uploading image: ", err)
                return {
                    status: 500,
                    data: {
                        msg: 'Error processing image. Please ask admin to look at the database',
                        success: false
                    }
                }
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