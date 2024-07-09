import { tracker } from "../utils/editSessions/tracker";
import { getUserName } from "../middleware/jwt";

export default function handleStopEditing(req: any, res: any){
    const userName = getUserName(req)
    if(typeof(userName) === 'string'){
        tracker.removeEditSession(userName)
    }
}