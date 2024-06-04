import express from 'express';
import updatePageContents from './db/updatePageContents';

const apiRouter = express.Router()

apiRouter.get('/test', (req: any, res: any) => {
    console.log('test')
    res.json({msg: "success"})
})

apiRouter.get('/getPageContents', (req, res) => {
    const title = req.query.title
    let pageContentsResult
    if(title === "test"){
      pageContentsResult = 
        [
            {
            type: "Header",
            text: "test",
            },
            {
            type: "Paragraph",
            text: "test paragraph for my website",
            },
        ]

    } else {
      pageContentsResult =
        [
          {
            type: "Header",
            text: "page not found"
          }
        ]
    }


    res.json(pageContentsResult)
})


apiRouter.post('/updatePageContents', async(req, res) => {
    const response = await updatePageContents(req.body)
    res.status(response.status).json(response.data)
})

export default apiRouter