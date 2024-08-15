import ConceptContent from '../models/conceptContents';
import { httpResponse } from '../../models';

export default async function getImageList(): Promise<httpResponse>{
    try{
        let imageTitleList: any[] = []

        const conceptList: any[] = await ConceptContent.find({}).select('title')
        imageTitleList.concat(conceptList)
        imageTitleList.sort()

        return{
            status: 200,
            data: {
                msg: "Successfully retrieved image list",
                imageList: imageTitleList
            }
        }
    }catch(err){
        console.error(err)
        return{
            status: 500,
            data: {
                msg: "Internal Server Error"
            }
        }
    }
}