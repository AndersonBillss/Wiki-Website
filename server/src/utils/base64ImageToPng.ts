import sharp from 'sharp';

export default async function base64ImageToPng(img: string): Promise<Buffer | null>{
    const base64Image = img;

    const matches = base64Image.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        return null
    }
    const base64Data = matches[2];
    const imageData = Buffer.from(base64Data, 'base64');

    // Make sure image isn't already PNG
    // Sharp turns PNG animations into images
    const pngSignature = "89504e470d0a1a0a"
    const imageDataSignature = imageData.toString("hex").slice(0,pngSignature.length)
    const imageDataIsPng = imageDataSignature === pngSignature
    if(imageDataIsPng){
        return imageData
    }

    // Convert image to PNG
    const highResolutionPng = sharp(imageData)
        .png()    

    const buffer: Buffer = await highResolutionPng.toBuffer()
    return(buffer)
}