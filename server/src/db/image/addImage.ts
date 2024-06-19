import AssetContent from '../models/assetContents';
import ConceptContent from '../models/conceptContents';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

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

    const mimeType = matches[1];
    const base64Data = matches[2];
    const imageData = Buffer.from(base64Data, 'base64');
    const fileExtension = mimeType.split('/')[1];

    const outputPath = path.join(__dirname, 'uploads', `cached.png`);


    // Ensure the uploads directory exists
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
    }

    try {
        // Convert image to PNG
        await sharp(imageData)
            .png()
            .toFile(outputPath);

        const convertedFile = outputPath;
        const imgObject = {
            src: /* Buffer.from(convertedFile).toString('base64') */convertedFile,
            title: newContents.title.toLowerCase(),
            tags: newContents.tags
        }



        let saveResult
        if(pageName === 'assets'){
            try {
                const title = imgObject.title
    
                const imageWithSameTitle = await AssetContent.findOne({ title }); // Clear existing contents for this title
                if(imageWithSameTitle){
                    saveResult = {
                        status: 200,
                        data: { msg: "Image with title already exists" }
                    }
                } else {
                    await AssetContent.insertMany(newContents);
                    saveResult = {
                        status: 200,
                        data: {
                            msg: 'Successfully uploaded file'
                        }
                    };
                }
        
            } catch (err) {
                console.error(err)
                saveResult = (
                    {
                        status: 500,
                        data: { msg: 'Error saving contents' }
                    }
                );
            }
    

        } else if(pageName === 'concept'){
            try {
                const title = imgObject.title
    
                const imageWithSameTitle = await ConceptContent.findOne({ title }); // Clear existing contents for this title
                if(imageWithSameTitle){
                    saveResult = {
                        status: 200,
                        data: { msg: "Image with title already exists" }
                    }
                } else {
                    await ConceptContent.insertMany(newContents);
                    saveResult = {
                        status: 200,
                        data: {
                            msg: 'Successfully uploaded file'
                        }
                    };
                }
        
            } catch (err) {
                console.error(err)
                saveResult = (
                    {
                        status: 500,
                        data: { msg: 'Error saving contents' }
                    }
                );
            }
        } else {
            saveResult = {
                    status: 400,
                    data: { msg: 'Specified page does not exist' }
                }
        
        }

        return saveResult

        


    } catch (error) {
        console.error('Error processing image:', error);
        return {
            status: 500,
            data: {
                msg: 'Error processing image.'
            }
        };
    }
}