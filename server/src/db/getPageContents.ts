import PageContents from "./models/pageContents";

export default async function getPageContents(title: string){
    try{
        const queryResult =  await PageContents.findOne({ title })
        
        if(queryResult){
            const contents = queryResult.contents
            return {
                status: 200,
                data: {
                    registered: true,
                    contents: contents
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
                    ]
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