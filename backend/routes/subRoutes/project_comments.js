import express from "express";
import * as projComments from "../../models/proj_comments.js"
import requireAuth from "../../auth/accessRole.js";
import validate from "../../middleware/validate.js";
import { commentSchema } from "../../schemas/commentSchema.js";

export default function projCommentsRouter(){
    const router = express.Router()

    router.post("/addcomment",requireAuth("admin", "owner", "guest"), validate(commentSchema), async (req, res, next)=>{
        try {
            const comment = await projComments.createRow({
                ...req.body,
                user_id: req.user.id
            })
            res.status(201).json(comment)

        } catch (error) {
            next(error)
        }
    })

    router.get("/getcomments/:proj_id", async (req, res, next)=>{
        try{
            const result = await projComments.getTable(req.params.proj_id)
            res.json(result)
        } catch (error) {
            next(error)
        }
    })

    router.post("/deletecomment", requireAuth("admin", "owner", "guest"), async (req, res, next)=>{
        try{
            const res = {
                id: req.body.comment_id,
                user_id:req.user.id,
                isAdmin: req.user.role === "admin"
            }
            projComments.deleteProjComment(res)
        } catch (error) {
            next(error)
        }
    })

    return router
}
