import getPageContents from '../db/page/getPageContents';

export default async function handleGetPageContents(req: any, res: any){
    const title = req.query.title
    const result = await getPageContents(`${title}`)
    res.status(result.status).json(result.data)
}