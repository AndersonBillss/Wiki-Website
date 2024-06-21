import AssetContent from '../models/assetContents';
import ConceptContent from '../models/conceptContents';
import sharp from 'sharp';

import getImages from './getImages';

export default async function addImage(pageName: string, newContents: any) {
    const base64Image = newContents.src;

    if (!base64Image) {
        return {
            status: 400,
            data: {
                msg:'No file uploaded.'
            }
        };
    }

    const matches = base64Image.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        return {
            status: 400,
            data: {
                msg: 'Invalid base64 image format.'
            }
        };
    }

    const base64Data = matches[2];
    const imageData = Buffer.from(base64Data, 'base64');


    try {
        const metadata = await sharp(imageData).metadata();
        const originalWidth = metadata.width;
        const originalHeight = metadata.height;
        let widthToHeight: number = 0
        if(originalHeight && originalWidth){
            widthToHeight = originalWidth / originalHeight
        } else {
            return({
                    status: 400,
                    data: {
                        msg: 'image has no height or no width'
                    }
                }
            )
        }

        // Convert image to PNG
        const highResolutionPng = sharp(imageData)
            .png()    

        const highResolutionBuffer = await highResolutionPng.toBuffer()
        const highResolutionBase64ConvertedImage = highResolutionBuffer.toString('base64');

        const medResResizeHeight = 600
        const medResResizeWidth = Math.floor(medResResizeHeight * widthToHeight)
        const medResolutionBuffer = await highResolutionPng.resize(medResResizeWidth, medResResizeHeight).toBuffer()
        const medResolutionBase64ConvertedImage = medResolutionBuffer.toString('base64')

        const lowResResizeHeight = 200
        const lowResResizeWidth = Math.floor(lowResResizeHeight * widthToHeight)
        const lowResolutionBuffer = await highResolutionPng.resize(lowResResizeWidth, lowResResizeHeight).toBuffer()
        const lowResolutionBase64ConvertedImage = lowResolutionBuffer.toString('base64')

        const imgObject = {
            highResSrc: highResolutionBase64ConvertedImage,
            medResSrc: medResolutionBase64ConvertedImage,
            lowResSrc: lowResolutionBase64ConvertedImage,
            title: newContents.title.toLowerCase(),
            tags: newContents.tags
        }



        let saveResult: any
        if(pageName === 'assets'){
            try {
                const title = imgObject.title
    
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
                const title = imgObject.title
    
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