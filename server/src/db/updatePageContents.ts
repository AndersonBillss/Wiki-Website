import PageContents from './models/pageContents';
import dotenv from 'dotenv'

dotenv.config()

export default async function updatePageContents(newContents: any){
    const { title, contents } = newContents
    try {
        await PageContents.deleteMany({ title }); // Clear existing contents for this title
/*         const pageContents = contents.map((content: any) => new PageContents({ ...content, title }));
 */        await PageContents.insertMany(/* pageContents */newContents);
        
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