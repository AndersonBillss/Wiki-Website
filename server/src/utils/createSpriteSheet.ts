export default function createSpriteSheet(imageArray: Buffer[]){
    const totalLength = imageArray.reduce((sum, buf) => sum + buf.length, 0);
    return Buffer.concat(imageArray, totalLength)
}