import PageContents from './models/pageContents';

export default async function updatePageContents(newContents: any){
    const { title } = newContents
    try {
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