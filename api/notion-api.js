import { NotionAPI } from "notion-client";

const notion = new NotionAPI();

export default async function handler(req, res){
    try{
        const { pageId } = req.query;
        const recordMap = await notion.getPage(pageId);
        res.status(200).json(recordMap);
    }
    catch(e){
        res.status(500).json({
            Error: e,
            msg: "Vercel API ERROR",
        })
    }
}