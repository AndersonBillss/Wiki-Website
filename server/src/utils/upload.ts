import multer from 'multer';
import fs from 'fs'
import path from 'path';
  
export const allowUpload = multer({
  limits: {
      fieldSize: 50000 * 10240 * 10240
  }
});

export function uploadImage(folder: string, id: string, imageSrc: Buffer){
  
  const uploadPath = path.join(__dirname, '../../uploads', folder);

  // Ensure the upload directory exists
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  // Save the image
  const imagePath = path.join(uploadPath, `${id}.png`);
  fs.writeFileSync(imagePath, imageSrc);
}

export function removeImage(folder: string, id: string){
  const uploadPath = path.join(__dirname, '../../uploads', folder);
  const imagePath = path.join(uploadPath, `${id}.png`);
  fs.unlinkSync(imagePath);
} 

export function removeFolder(folderPath: string){
  const uploadPath = path.join(__dirname, '../../uploads', folderPath);
  fs.rm(uploadPath, { recursive: true, force: true }, err => {
    if(err) throw err
  })
}
