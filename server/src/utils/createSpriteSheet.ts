import mergeImg from 'merge-img'
import Jimp from 'jimp'

import extractApngFrames from './extractApngFrames';
import { testUpload, clearTestUploads } from './upload';

export default async function createSpriteSheet(imageArray: Buffer[]): Promise<{buffer: Buffer, frames: number} | null>{
    clearTestUploads()
    let newImageArray: Buffer[] = []

    for(const image of imageArray){
        if(isApng(image)){
            const frames = newImageArray.concat(await extractApngFrames(image))
            newImageArray = newImageArray.concat(frames)
        } else {
            newImageArray.push(image)
        }
    }
    const frames = newImageArray.length

    let spritesheetJimp: Jimp
    spritesheetJimp = await mergeImg(newImageArray, {direction: true})

    return new Promise<{buffer: Buffer, frames: number} | null>((resolve, reject) => {
        spritesheetJimp.getBuffer('image/png', (err, buffer) => {
            if (err) {
                console.error('Error getting buffer:', err);
                resolve(null); 
            } else {
                resolve({buffer, frames});
            }
        });
    });
}

function isApng(buffer: Buffer): boolean {
    const PNG_SIGNATURE_LENGTH = 8;
    let offset = PNG_SIGNATURE_LENGTH;

    //Check for "acTL" chunks to determine whether the png is animated
    while (offset < buffer.length) {
        const chunkLength = buffer.readUInt32BE(offset);
        const chunkType = buffer.toString('ascii', offset + 4, offset + 8);

        if (chunkType === 'acTL') {
            return true;
        }
        offset += 8 + chunkLength + 4;
    }

    return false;
}

