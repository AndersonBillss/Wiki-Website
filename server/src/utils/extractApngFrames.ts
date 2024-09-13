import sharp from 'sharp';

import parseAPNG from 'apng-js';

interface storedFrame {
    bufferPos: {top: number, left: number},
    bufferChanges: Buffer,
    fullBuffer?: Buffer,
    bufferAfterDisposal?: Buffer,
    blendOp: number,
    disposeOp: number,
}

export default async function extractApngFrames(buffer: Buffer): Promise<Buffer[]> {
    const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    const apng = parseAPNG(arrayBuffer);
    
    if (!(apng instanceof Error === false)) {
        throw new Error('Failed to parse APNG.');
    }
    if (!(apng.frames.length > 0)) {
        throw new Error('No frames found.');
    }

    let pngFramesPromises: Promise<storedFrame>[] = apng.frames.map(async(item) =>{
        if(!item.imageData){
            throw new Error('Invalid image data.');
        }
        return {
            bufferChanges: await blobToBuffer(item.imageData),
            bufferPos: {top: item.top, left: item.left},
            blendOp: item.blendOp,
            disposeOp: item.disposeOp,
        }
    });
    const frames: storedFrame[] = await Promise.all(pngFramesPromises) 

    let currentFrame: Buffer = frames[0].bufferChanges

    for(let i=0; i<frames.length; i++){
        const frame = frames[i]
        const prevFrame = frames[i-1]?frames[i-1]:frames[i]
                        
        //Apply the disposal operation
        switch(prevFrame.disposeOp){
            case 0:
                break
            case 1:
                currentFrame = await removeOverlap(currentFrame, prevFrame.bufferChanges, prevFrame.bufferPos)
                break
            case 2: 
                const frameRevert = frames[i-2]
                if(frameRevert.bufferAfterDisposal){
                    currentFrame = frameRevert.bufferAfterDisposal
                }
                break
        }
        prevFrame.bufferAfterDisposal = currentFrame

        //Apply the blend operation
        switch(frame.blendOp){
            case 0:
                currentFrame = await sourceBlend(currentFrame, frame.bufferChanges, frame.bufferPos)
                break
            case 1:
                currentFrame = await overBlend(currentFrame, frame.bufferChanges, frame.bufferPos)
                break
        }
        
        
        frame.fullBuffer = currentFrame
    }

    const totalFrames: Buffer[] = []
    frames.forEach(frame => {
        if(frame.fullBuffer){
            totalFrames.push(frame.fullBuffer)
        }
    })
    return totalFrames
}



async function blobToBuffer(blob: Blob){
    return Buffer.from(await blob.arrayBuffer())
}

async function removeOverlap(
    originalBuffer: Buffer, 
    overlappingBuffer: Buffer, 
    overlapOffset: { top: number; left: number }
): Promise<Buffer>{
    const { top, left } = overlapOffset;
    const deleteOverlay = await createWhiteBuffer(overlappingBuffer)
    const bufferWithDisposedArea = await sharp(originalBuffer)
    .composite([{ input: deleteOverlay, top, left, blend: 'dest-out' }])
    .toBuffer();
    return bufferWithDisposedArea
}

async function sourceBlend(
    originalBuffer: Buffer, 
    overlappingBuffer: Buffer, 
    overlapOffset: { top: number; left: number }
): Promise<Buffer>{
    const bufferWithDisposedArea = await removeOverlap(originalBuffer, overlappingBuffer, overlapOffset)
    return overBlend(bufferWithDisposedArea, overlappingBuffer, overlapOffset)
}

async function overBlend(
    originalBuffer: Buffer, 
    overlappingBuffer: Buffer, 
    overlapOffset: { top: number; left: number }
): Promise<Buffer>{
    const { top, left } = overlapOffset;
    const resultBuffer = await sharp(originalBuffer)
    .composite([{ input: overlappingBuffer, top, left, blend: 'over' }])
    .toBuffer();
    return resultBuffer
}


async function createWhiteBuffer(buffer: Buffer){
    const overlayMetadata = await sharp(buffer).metadata();
    if(!overlayMetadata.width || !overlayMetadata.height){
        throw new Error('Overlay has no width or height');
    }

    const result = await sharp(
        {
            create: {
                width: overlayMetadata.width,
                height: overlayMetadata.height,
                channels: 3,
                background: {r: 255, g: 255, b: 255}
            }
        })
    .png()
    .toBuffer();

    return result
}
