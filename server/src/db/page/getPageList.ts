import { httpResponse } from "../../models";
import LorePageContents from "../models/lorePageContents";
import GameplayPageContents from "../models/gameplayPageContents";

export default async function getPageList(section: string): Promise<httpResponse>{
    try{
        let uniqueTitles: any
        if(section === "gameplay"){
            uniqueTitles =  await GameplayPageContents.distinct('title')
        } else if(section === "lore"){
            uniqueTitles =  await LorePageContents.distinct('title')
        } else {
            return {
                status: 400,
                data: {
                    msg: "Invalid section name!"
                }
            }
        }
        return {
            status: 200,
            data: uniqueTitles
        }
    } catch (err){
        console.error("problem with fetching pages from the database:", err)
        return{
            status: 500,
            data: "internal server error"
        }
    }
}
