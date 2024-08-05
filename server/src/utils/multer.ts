import multer from 'multer';
  
export const upload = multer({
  limits: {
      fieldSize: 50000 * 10240 * 10240
  }
});
