import getPageContents from '../db/page/getPageContents';
import { tracker } from '../utils/editSessions/tracker';

export default async function handleGetPageContents(req: any, res: any){
    const editor = tracker.findWhoIsEditing(req.body.page)
    
    const title = req.query.title
    let result = await getPageContents(`${title}`)
    result.data.currentEditor = editor
    res.status(result.status).json(result.data)
}