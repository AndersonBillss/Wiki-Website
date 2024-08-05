import getPageList from "../db/page/getPageList"

export default async function handlePageList(req: any, res: any){
    const section = req.query.section
    const result = await getPageList(section)
    res.status(result.status).json(result.data)
}