import { getUserName } from "../middleware/jwt"
import { tracker } from "../utils/editSessions/tracker"

export default function startEditing(req: any, res: any){
    const userName = getUserName(req)
    const pageName = req.query.pageName
    if(!userName){
        res.status(400).send(
            {
            success: false,
            msg: 'No username in token'
            }
        )
        return
    }
    if(!pageName || typeof(pageName) !== 'string'){
        res.status(400).send(
            {
            success: false,
            msg: 'No pageName provided'
            }
        )
        return
    }
    const currentSession = tracker.findWhoIsEditing(pageName)
    if(typeof(currentSession) === 'string'){
        const personEditing = currentSession === userName?"You are":`${userName} is`
        res.status(200).send(
            {
                success: true,
                msg: `${personEditing} already editing this page`
            }
        )
        return
    }
    tracker.addEditSession(userName, pageName)
    res.status(200).send(
        {
            success: true,
            msg: 'successfully started edit session'
        }
    )
}