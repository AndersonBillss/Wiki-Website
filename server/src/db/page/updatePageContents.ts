import PageContents from '../models/pageContents';
import getPageContents from './getPageContents'

export default async function updatePageContents(newContents: any){
    const title = newContents.title.toLowerCase()
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
        await PageContents.deleteMany({ title }); // Clear existing contents for this title
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