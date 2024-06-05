import PageContents from "./models/pageContents";

export default async function getPageList(){
    try{
        const uniqueTitles = await PageContents.distinct('title')
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
