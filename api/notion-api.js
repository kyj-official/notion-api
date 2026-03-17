import { NotionAPI } from "notion-client";

const notion = new NotionAPI();

export default async function handler(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(200).end();

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