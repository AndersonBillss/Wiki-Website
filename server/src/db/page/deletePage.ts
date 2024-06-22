import { httpResponse } from "../../models";
import PageContents from "../models/pageContents";
import getPageList from "./getPageList";

export default async function deletePage(title: string): Promise<httpResponse>{
    try{
        const res = await PageContents.deleteMany({ title })
        const pageList = await getPageList()

        if(res.deletedCount === 0){
            return{
                status: 200,
                data: {
                    success: true,
                    msg: 'no page to delete',
                    pageList: pageList
                }
            }
        } else {
            return{
                status: 200,
                data: {
                    success: true,
                    msg: 'page deleted succesfully',
                    pageList: pageList.data
                }
            }
        }
    } catch(err) {
        return {
            status: 500,
            data: {
                success: false,
                msg: 'internal server error'
            }
        }
    }
}
