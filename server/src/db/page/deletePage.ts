import { httpResponse } from "../../models";
import GameplayPageContents from "../models/gameplayPageContents";
import LorePageContents from "../models/lorePageContents";
import getPageList from "./getPageList";

export default async function deletePage(section: string, title: string): Promise<httpResponse>{
    title = title.toLowerCase().trim()
    try{
        let res: any
        if(section === "lore"){
            res = await LorePageContents.deleteMany({ title: { $regex: new RegExp(title, "i") }})
        } else if(section === "gameplay"){
            res = await GameplayPageContents.deleteMany({ title: { $regex: new RegExp(title, "i") }})
        } else {
            return {
                status: 400,
                data: {
                    msg: "Invalid section name!"
                }
            }
        }
        const pageList = await getPageList(section)

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
