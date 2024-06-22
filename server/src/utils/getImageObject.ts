import sharp from 'sharp';
import { httpResponse } from '../models';

export default async function getImageObject(img: any): Promise<httpResponse>{

    
    if(!img.title.toLowerCase().trim()){
        return{
            status: 400,
            data: {
                success: false,
                msg: 'Image has no title'
            }
        }
    }
    if(!img.tags){
        return{
            status: 400,
            data: {
                success: false,
                msg: 'Image has no tag array'
            }
        }
    }

    const base64Image = img.src;
    
    if (!base64Image) {
        return {
            status: 400,
            data: {
                success: 'false',
                msg:'No file uploaded.'
            }
        };
    }

    const matches = base64Image.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        return {
            status: 400,
            data: {
                success: 'false',
                msg: 'Invalid base64 image format.'
            }
        };
    }
    const base64Data = matches[2];
    const imageData = Buffer.from(base64Data, 'base64');

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
                    success: false,
                    msg: 'Image has no height or no width'
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
        title: img.title.toLowerCase().trim(),
        tags: img.tags
    }

    return({
        status: 200,
        data: {
            success: true,
            img: imgObject
        }
    }
)
}