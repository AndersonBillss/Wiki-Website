import getPageContents from '../db/page/getPageContents';
import { getUserName } from '../middleware/jwt';
import { tracker } from '../utils/editSessions/tracker';

export default async function handleGetPageContents(req: any, res: any){
    const section = req.query.section
    let editor = tracker.findWhoIsEditing(req.query.title)
    const userName = getUserName(req)
    if(userName && userName === editor){
        tracker.removeEditSession(userName)
        editor = undefined
    }

    
    const title = req.query.title
    let result = await getPageContents(section, `${title}`)
    result.data = {
        ...result.data,
        currentEditor: editor
    }
    res.status(result.status).json(result.data)
}