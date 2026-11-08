import express from "express";
import path from "path";
import {fileURLToPath} from "url";
import * as proj from "../../models/proj_cards.js"
import projectLikesRouter from "./projectlikes.js";
import projCommentsRouter from "./project_comments.js";
import requireAuth from "../../auth/accessRole.js";
import { projectImageParamsSchema, createProjectSchema} from "../../schemas/projectSchema.js"
import validate from "../../middleware/validate.js"



const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename)

export default function projectRouting(upload){
    const router = express.Router()

    router.use(projectLikesRouter())
    router.use(projCommentsRouter())

    router.post("/createproj", requireAuth("admin", "owner"), upload.single("image"), validate(createProjectSchema), async (req, res, next)=>{

    if (!req.file) {
        return res.status(400).json({ error: "Image is required" })
    }

    const proj_card = {
        ...req.body,
        image_url: req.file.filename
    }

        await proj.createRow(proj_card)
        res.sendStatus(201)
    })

    router.get("/getproj", async (req, res, next)=>{
        const result = await proj.getTable()
        res.json(result.rows)
    })

    router.get("/projimage/:filename", validate(projectImageParamsSchema, "params"), (req, res, next)=>{
        res.type("image/jpeg")
        res.sendFile(req.params.filename, {
            root: path.resolve(_dirname, "../../assets/project"),
            dotfiles: "deny"
        }, error => {
            if (error) next(error)
        })
    })

    router.post("/updateProj",requireAuth("admin", "owner"), (req, res, next)=>{
        const check= {
            columnName:"is_completed",
            ...req.body
        }
        console.log(check)
        proj.updateProjCards(check)
    } )


    return router
}