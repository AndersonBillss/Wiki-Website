import PageContents from './models/pageContents';

export default async function updatePageContents(newContents: any){
    const { title } = newContents
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
        
        return(
            {
                status: 200,
                data: { success: true, msg: 'contents successfully saved' }
            }
        );
    } catch (err) {
        console.error(err)
        return(
            {
                status: 200,
                data: { success: false, msg: 'Error saving contents' }
            }
        )
        ;
    }
}