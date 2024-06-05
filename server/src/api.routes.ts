import express from 'express';
import updatePageContents from './db/updatePageContents';
import getPageContents from './db/getPageContents';
import getPageList from './db/getPageList';

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

export default apiRouter