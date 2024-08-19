import sharp from 'sharp';

export default async function base64ImageToPng(img: string): Promise<Buffer | null>{
    const base64Image = img;

    const matches = base64Image.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        return null
    }
    const base64Data = matches[2];
    const imageData = Buffer.from(base64Data, 'base64');


    // Convert image to PNG
    const highResolutionPng = sharp(imageData)
        .png()    

    const buffer: Buffer = await highResolutionPng.toBuffer()

    return(buffer)
}