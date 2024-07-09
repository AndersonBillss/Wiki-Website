//imported modules
import express from 'express';
import bodyParser from 'body-parser';

// Configure express
const apiRouter = express.Router()
apiRouter.use(bodyParser.json({ limit: '50mb' }));
apiRouter.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));



//code from other files
    //utils
    import { upload } from './utils/multer';
    //middleware
    import { verifyToken } from './middleware/jwt';
    //controllers
    import handlePageList from './controllers/pageListController';
    import handleGetPageContents from './controllers/pageContentsController';
    import handleStartEditing from './controllers/startEditingController';
    import handleStopEditing from './controllers/endEditingController';
    import handleUpdatePageContents from './controllers/updatePageContentsController';
    import handleDeletePage from './controllers/deletePageController';

    import handleGetImages from './controllers/getImagesController';
    import handleGetImage from './controllers/getImageController';
    import handleImageList from './controllers/imageListController';
    import handleGetTags from './controllers/getTagsController';
    import handleUploadImage from './controllers/uploadImageController';
    import handleUpdateImage from './controllers/updateImageController';
    import handleDeleteImage from './controllers/deleteImageController';

    import handleGetUserInfo from './controllers/getUserInfoController';
    import handleLogIn from './controllers/logInController';
    import handleSignUp from './controllers/signUpController';


apiRouter.get('/pageList', verifyToken, async(req, res) => { handlePageList(req, res) })
apiRouter.get('/getPageContents', verifyToken, async(req, res) => { handleGetPageContents(req, res) })
apiRouter.get('/startEditing', verifyToken, async(req, res) => { handleStartEditing(req,res) })
apiRouter.get('/stopEditing', verifyToken, async(req, res) => { handleStopEditing(req,res) })
apiRouter.post('/updatePageContents', verifyToken, async(req, res) => { handleUpdatePageContents(req, res) })
apiRouter.delete('/deletePage', verifyToken, async(req, res) => { handleDeletePage(req, res) })

apiRouter.get('/getImages', verifyToken, async(req, res) => { handleGetImages(req, res) })
apiRouter.get('/getImage', verifyToken, async(req, res) => { handleGetImage(req, res) })
apiRouter.get('/imageList', verifyToken, async(req, res) => { handleImageList(req, res)})
apiRouter.get('/getTags', verifyToken, async(req, res) => { handleGetTags(req, res) })
apiRouter.post('/uploadImage', verifyToken, upload.single('image'), async(req, res) => { handleUploadImage(req, res) })
apiRouter.post('/updateImage', verifyToken, async(req, res) => { handleUpdateImage(req, res) })
apiRouter.delete('/deleteImage', verifyToken, async(req, res) => { handleDeleteImage(req, res) })

apiRouter.get('/getUserInfo', verifyToken, async(req, res) => { handleGetUserInfo(req, res) })
apiRouter.post('/logIn', async(req, res) => { handleLogIn(req, res) })
apiRouter.post('/signUp', async(req, res) => { handleSignUp(req, res) })


export default apiRouter