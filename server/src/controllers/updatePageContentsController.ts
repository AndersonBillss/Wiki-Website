import updatePageContents from "../db/page/updatePageContents"
import { getUserName } from "../middleware/jwt"
import { tracker } from "../utils/editSessions/tracker"

export default async function handleUpdatePageContents(req: any, res: any){
    const section = req.query.section
    const userName = getUserName(req)
    const editor = tracker.findWhoIsEditing(section, req.body.page)
    if(editor !== userName && typeof(editor) === 'string'){
        res.status(409).send({
            success: false,
            msg: "Someone is already editing this page"
        })
        return
    }
    if(typeof(userName) !== 'string'){
        res.status(400).send({
            success: false,
            msg: "No username found in token"
        })
        return
    }
    tracker.removeEditSession(userName)

    const response = await updatePageContents(section, req.body)
    res.status(response.status).json(response.data)
}