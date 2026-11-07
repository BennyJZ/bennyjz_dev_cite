import express from "express";
import path from "path";
import {fileURLToPath} from "url";
import * as proj from "../../models/proj_cards.js"
import projectLikesRouter from "./projectlikes.js";
import projCommentsRouter from "./project_comments.js";
import requireAuth from "../../auth/accessRole.js";


const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename)

export default function projectRouting(upload){
    const router = express.Router()

    router.use(projectLikesRouter())
    router.use(projCommentsRouter())

    router.post("/createproj", requireAuth("admin", "owner"), upload.single("image"),async (req, res, next)=>{

        const newLink = (()=>{
            if(!req.body.link.includes("https://")) {
                return `https://${req.body.link}`
            }else {
                return req.body.link
            }
        })()
        const proj_card = {
            ...req.body,
            link: newLink,
            image_url: "assets/project/"+req.file.filename,
            tag:req.body.tag.split(",")
        }

        await proj.createRow(proj_card)
        res.sendStatus(201)
    })

    router.get("/getproj", async (req, res, next)=>{
        const result = await proj.getTable()
        res.json(result.rows)
    })

    router.get("/projimage/{*name}",(req, res, next)=>{
        const imagePath = path.join(_dirname,"..","..",req.params.name.join("/"))
        res.type("image/jpeg")
        res.sendFile(imagePath)
    })


    return router
}