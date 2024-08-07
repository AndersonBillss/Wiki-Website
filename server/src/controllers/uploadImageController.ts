import addImage from "../db/image/addImage";

export default async function handleUploadImage(req: any, res: any){
    const page = req.query.pageName
    if(typeof(page) !== 'string'){
        res.status(400).send({
            msg: 'pageName must be a string'
        })
    } else {
        const file = req.body;
        if(page !== "concept" && page !== "assets"){
            res.status(400).send(
                { 
                    msg: 'Specified page does not exist',
                    success: false
                }
            )
            return
        }

        const result = await addImage(page, file)
        res.status(result.status).send(result.data)
    }
}