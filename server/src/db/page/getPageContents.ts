import { httpResponse } from "../../models";
import getImageArray from "../image/getImageArray";
import LorePageContents from "../models/lorePageContents";
import GameplayPageContents from "../models/gameplayPageContents";
import getPageList from "./getPageList"

export default async function getPageContents(section: string, title: string): Promise<httpResponse>{
    try{
        let queryResult: any;
        let pageList: any;
        if(section === "gameplay"){
            queryResult =  await GameplayPageContents.findOne({ title })
            pageList = await getPageList(section)
        } else if(section === "lore"){
            queryResult =  await LorePageContents.findOne({ title })
            pageList = await getPageList(section)
        } else {
            return {
                status: 400,
                data: {
                    msg: "Invalid section name!"
                }
            }
        }
        
        if(queryResult){
            const contents = queryResult.contents

            //get an array of image locations
            let imageLocationArray: any[] = []
            contents.forEach((item: any) => {
                if(item.imageLocation){
                    imageLocationArray.push(item.imageLocation)
                }
            })
            const imageArray = await getImageArray(imageLocationArray)
            return {
                status: 200,
                data: {
                    registered: true,
                    contents: contents,
                    images: imageArray.data.images,
                    pageList: pageList.data
                }
            }
        } else {
            return {
                status: 200,
                data: {
                    registered: false,
                    contents: [
                        {
                            type: "Header",
                            text: "This is a new page"
                        },
                        {
                            type: "Paragraph",
                            text: "Begin editing this page"
                        }
                    ],
                    pageList: pageList.data
                }
            }
        }

    } catch(err) {
        console.error('Error while getting page contents', err)
        return {
            status: 500,
            data: {msg: 'internal server error'}
        }
    }
}