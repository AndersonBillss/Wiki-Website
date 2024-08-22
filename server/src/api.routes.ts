//imported modules
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

// Configure express
const apiRouter = express.Router()
apiRouter.use(bodyParser.json({ limit: '5gb' }));
apiRouter.use(bodyParser.urlencoded({ limit: '5gb', extended: true }));



//code from other files
    //utils
    import { allowUpload } from './utils/upload';
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

    import handleGetAssetFolderContents from './controllers/getAssetFolderContentsController';
    import handleGetAssetFolders from './controllers/getAssetFoldersController';
    import handleAddAssetFolder from './controllers/addAssetFolderController';
    import handleDeleteAssetFolder from './controllers/deleteAssetFolderController';
    import handleAddAssetItem from './controllers/addAssetItemController';
    import handleDeleteAssetItem from './controllers/deleteAssetItemController';

    import handleGetUserInfo from './controllers/getUserInfoController';
    import handleLogIn from './controllers/logInController';
    import handleSignUp from './controllers/signUpController';


//Serve images from the ../uploads folder
apiRouter.use('/uploads', express.static(path.join(__dirname, "../uploads")))

//Ping
apiRouter.get('/ping', async(req, res) => {
    res.send("SUCCESS!")
})

//Page routes
apiRouter.get('/pageList', verifyToken, async(req, res) => { handlePageList(req, res) })
apiRouter.get('/getPageContents', verifyToken, async(req, res) => { handleGetPageContents(req, res) })
apiRouter.get('/startEditing', verifyToken, async(req, res) => { handleStartEditing(req,res) })
apiRouter.get('/stopEditing', verifyToken, async(req, res) => { handleStopEditing(req,res) })
apiRouter.post('/updatePageContents', verifyToken, async(req, res) => { handleUpdatePageContents(req, res) })
apiRouter.delete('/deletePage', verifyToken, async(req, res) => { handleDeletePage(req, res) })

//Image routes
apiRouter.get('/getImages', verifyToken, async(req, res) => { handleGetImages(req, res) })
apiRouter.get('/getImage', verifyToken, async(req, res) => { handleGetImage(req, res) })
apiRouter.get('/imageList', verifyToken, async(req, res) => { handleImageList(req, res)})
apiRouter.get('/getTags', verifyToken, async(req, res) => { handleGetTags(req, res) })
apiRouter.post('/uploadImage', verifyToken, allowUpload.single('image'), async(req, res) => { handleUploadImage(req, res) })
apiRouter.post('/updateImage', verifyToken, async(req, res) => { handleUpdateImage(req, res) })
apiRouter.delete('/deleteImage', verifyToken, async(req, res) => { handleDeleteImage(req, res) })

//Asset routes
apiRouter.get('/getAssetFolders', verifyToken, async(req, res) => { handleGetAssetFolders(req, res) })
apiRouter.get('/getAssetFolderContents', verifyToken, async(req, res) => { handleGetAssetFolderContents(req, res) })
apiRouter.post('/addAssetFolder', verifyToken, async(req, res) => { handleAddAssetFolder(req, res) })
apiRouter.post('/addAssetItem', verifyToken, allowUpload.array("image.srcArray", 20), async(req, res) => { handleAddAssetItem(req, res) })
apiRouter.delete('/deleteAssetItem', verifyToken, async(req, res) => { handleDeleteAssetItem(req, res) })
apiRouter.delete('/deleteAssetFolder', verifyToken, async(req, res) => { handleDeleteAssetFolder(req, res) })

//User Info Routes
apiRouter.get('/getUserInfo', verifyToken, async(req, res) => { handleGetUserInfo(req, res) })
apiRouter.post('/logIn', async(req, res) => { handleLogIn(req, res) })
apiRouter.post('/signUp', async(req, res) => { handleSignUp(req, res) })

apiRouter.use('**', (req, res) => {
    res.status(404).send("Invalid Route Name")
})


export default apiRouter