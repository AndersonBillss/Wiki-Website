import PageContents from "./models/pageContents";

export default async function deletePage(title: string){
    try{
        const res = await PageContents.deleteMany({ title })
        if(res.deletedCount === 0){
            return{
                status: 200,
                data: {
                    success: true,
                    msg: 'no page to delete'
                }
            }
        } else {
            return{
                status: 200,
                data: {
                    success: true,
                    msg: 'page deleted succesfully'
                }
            }
        }
    } catch(err) {
        return {
            status: 500,
            data: {
                success: true,
                msg: 'internal server error'
            }
        }
    }
}
