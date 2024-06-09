//imported modules
import express from 'express';

//code from other files
import updatePageContents from './db/updatePageContents';
import getPageContents from './db/getPageContents';
import getPageList from './db/getPageList';
import deletePage from './db/deletePage';

const apiRouter = express.Router()

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
    let result
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

export default apiRouter