import { httpResponse } from "../../models";
import getImageArray from "../image/getImageArray";
import PageContents from "../models/pageContents";
import getPageList from "./getPageList"

export default async function getPageContents(title: string): Promise<httpResponse>{
    try{
        const queryResult =  await PageContents.findOne({ title })
        const pageList = await getPageList()
        
        if(queryResult){
            const contents = queryResult.contents

            //get an array of image locations
            let imageLocationArray: any[] = []
            contents.forEach(item => {
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