import getPageContents from '../db/page/getPageContents';
import { getUserName } from '../middleware/jwt';
import { tracker } from '../utils/editSessions/tracker';

export default async function handleGetPageContents(req: any, res: any){
    const section = req.query.section
    const title = req.query.title

    let editor = tracker.findWhoIsEditing(section, title)
    const userName = getUserName(req)
    if(userName && userName === editor){
        tracker.removeEditSession(userName)
        editor = undefined
    }

    
    let result = await getPageContents(section, `${title}`)
    result.data = {
        ...result.data,
        currentEditor: editor
    }
    res.status(result.status).json(result.data)
}