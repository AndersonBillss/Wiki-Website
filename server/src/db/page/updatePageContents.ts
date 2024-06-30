import { httpResponse } from '../../models';
import PageContents from '../models/pageContents';
import getPageContents from './getPageContents'

export default async function updatePageContents(newContents: any): Promise<httpResponse>{
    const title = newContents.title.toLowerCase()
    newContents.contents = newContents.contents.map((item: any) => {
        if(item.type === 'Header'){
            return{
                type: item.type,
                text: item.text
            }
        } else if(item.type === 'Paragraph'){
            return{
                type: item.type,
                text: item.text
            }
        } else if(item.type === 'Image'){
            return{
                type: item.type,
                text: item.text,
                imageLocation: item.imageLocation
            }
        }
        return item
    })

    try {
        if(!title){
            return(
                {
                    status: 400,
                    data: { success: false, msg: 'no title specified' }
                }
            );
        }
        if(newContents.contents.length <= 0){
            return(
                {
                    status: 400,
                    data: { success: false, msg: 'no page content' }
                }
            );
        }
        await PageContents.deleteMany({
            title: { $regex: new RegExp(`^${title}$`, 'i') }
        }); // Clear existing contents for this title
        await PageContents.insertMany(newContents);

        const newPageContents = await getPageContents(title)
        if(`${newPageContents.status}`[0] !== '2'){
            return(
                {
                    status: 500,
                    data: { success: false, msg: 'error saving contents', updatedContents: newPageContents }
                }
            );
        }
        return(
            {
                status: 200,
                data: { success: true, msg: 'contents successfully saved', updatedContents: newPageContents }
            }
        );
    } catch (err) {
        console.error(err)
        return(
            {
                status: 500,
                data: { success: false, msg: 'Error saving contents' }
            }
        )
        ;
    }
}