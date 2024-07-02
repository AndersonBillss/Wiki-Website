//imported modules
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

//code from other files
//page
import updatePageContents from './db/page/updatePageContents';
import getPageContents from './db/page/getPageContents';
import getPageList from './db/page/getPageList';
import deletePage from './db/page/deletePage';
//image
import addImage from './db/image/addImage';
import getImages from './db/image/getImages';
import getImage from './db/image/getImage';
//models
import { httpResponse } from './models';
import updateImage from './db/image/updateImage';
import getImageList from './db/image/getImageList';
import getTagList from './db/image/getTagList';
import getImageArray from './db/image/getImageArray';
import deleteImage from './db/image/deleteImage';


// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, 'uploads');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `cached`);
    }
  });
  
  const upload = multer({ storage });



const apiRouter = express.Router()
apiRouter.use(bodyParser.json({ limit: '50mb' }));
apiRouter.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

apiRouter.get('/pageList', async(req, res) => {
    const result = await getPageList()
    res.status(result.status).json(result.data)
})
apiRouter.get('/getPageContents', async(req, res) => {
    const title = req.query.title
    const result = await getPageContents(`${title}`)
    res.status(result.status).json(result.data)
})
apiRouter.post('/updatePageContents', async(req, res) => {
    const response = await updatePageContents(req.body)
    res.status(response.status).json(response.data)
})
apiRouter.delete('/deletePage', async(req, res) => {
    const title = req.query.title
    let result: httpResponse
    if(typeof(title) === 'string'){
        result = await deletePage(title)
    } else {
        result = {
            status: 400,
            data: {
                success: false,
                msg: 'page name is not a string'
            }
        }
    }

    res.status(result.status).json(result.data)
})


apiRouter.get('/getImages', async(req, res) => {
    const page = req.query.pageName
    if(typeof(page) !== 'string'){
        res.status(400).send({
            msg: 'pageName must be a string'
        })
    } else {
        const result = await getImages(page)
        res.status(result.status).send(result.data)
    }
})

apiRouter.get('/getImage', async(req, res) => {
    const page = req.query.pageName
    const id = req.query.id
    if(typeof(page) !== 'string'){
        res.status(400).send({
            msg: 'pageName must be a string'
        })
    } else if(typeof(id) !== 'string'){
        res.status(400).send({
            msg: 'id must be a string'
        })
    }else {
        let result: httpResponse
        const resolution = req.query.resolution
        if(resolution === "med"){
            result = await getImageArray([{pageName: page, _id: id}])
            result.data.images = result.data.images[0]
        } else {
            result = await getImage(page, id)
        }
        res.status(result.status).send(result.data)
    }
})
apiRouter.get('/imageList', async(req, res) => {
    const pageName = `${req.query.pageName}`
    const result = await getImageList(pageName)
    res.send(result)
})
apiRouter.get('/imageList', async(req, res) => {
    const pageName = `${req.query.pageName}`
    const result = await getImageList(pageName)
    res.send(result)
})
apiRouter.get('/getTags', async(req, res) => {
    const pageName = `${req.query.pageName}`
    const result = await getTagList(pageName)
    res.send(result)
})

apiRouter.post('/uploadImage', upload.single('image'), async(req, res) => {
    const page = req.query.pageName
    if(typeof(page) !== 'string'){
        res.status(400).send({
            msg: 'pageName must be a string'
        })
    } else {
        const file = req.body;
        const result = await addImage(page, file)
        res.status(result.status).send(result.data)
    }
})
apiRouter.post('/updateImage', async(req, res) => {
    const page = req.query.pageName
    if(typeof(page) !== 'string'){
        res.status(400).send({
            msg: 'pageName must be a string'
        })
    } else {
        const file = req.body;
        const result = await updateImage(page, file)
        res.status(result.status).send(result.data)
    }
})

apiRouter.delete('/deleteImage', async(req, res) => {
    const pageName = `${req.query.pageName}`
    const id = `${req.query.id}`
    const result = await deleteImage(pageName, id)
    res.status(result.status).send(result.data)
})

export default apiRouter