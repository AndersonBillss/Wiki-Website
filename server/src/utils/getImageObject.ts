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


    // Convert image to PNG
    const highResolutionPng = sharp(imageData)
        .png()    

    const buffer: Buffer = await highResolutionPng.toBuffer()

    const imgObject = {
        src: buffer,
        title: img.title.toLowerCase().trim(),
        tags: img.tags
    }

    return({
        status: 200,
        data: {
            success: true,
            img: imgObject
        }
    })
}