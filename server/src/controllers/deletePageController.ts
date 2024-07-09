import { httpResponse } from '../models';
import deletePage from '../db/page/deletePage';
import { getUserName } from '../middleware/jwt';
import { tracker } from '../utils/editSessions/tracker';

export default async function handleDeletePage(req: any, res: any){
    const title = req.query.title


    const userName = getUserName(req)
    const currentSession = tracker.findWhoIsEditing(title)
    if(typeof(currentSession) === 'string' && currentSession !== userName){
        res.status(409).send(
            {
                success: false,
                msg: `${userName} is already editing this page`
            }
        )
        return
    }


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
}