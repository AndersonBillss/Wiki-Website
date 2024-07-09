import { httpResponse } from '../models';
import deletePage from '../db/page/deletePage';

export default async function handleDeletePage(req: any, res: any){
    const title = req.query.title
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