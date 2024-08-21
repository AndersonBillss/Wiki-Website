import mergeImg from 'merge-img'
import Jimp from 'jimp'

export default async function createSpriteSheet(imageArray: Buffer[]): Promise<Buffer | null>{
    let spritesheetJimp: Jimp
    spritesheetJimp = await mergeImg(imageArray, {direction: true})

    return new Promise<Buffer | null>((resolve, reject) => {
        spritesheetJimp.getBuffer('image/png', (err, buffer) => {
            if (err) {
                console.error('Error getting buffer:', err);
                resolve(null); 
            } else {
                resolve(buffer);
            }
        });
    });

}