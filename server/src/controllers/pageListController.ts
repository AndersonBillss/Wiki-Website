import getPageList from "../db/page/getPageList"

export default async function handlePageList(req: any, res: any){
    const result = await getPageList()
    res.status(result.status).json(result.data)
}