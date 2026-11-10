import express from "express";
import * as projComments from "../../models/proj_comments.js"
import * as commentReplies from "../../models/proj_comment_replies.js"
import requireAuth from "../../auth/accessRole.js";
import validate from "../../middleware/validate.js";
import { commentSchema } from "../../schemas/commentSchema.js";
import { commentLimiter } from "../../middleware/rateLimits.js"

export default function projCommentsRouter(){
    const router = express.Router()

    router.post("/addcomment",requireAuth("admin", "owner", "guest"), commentLimiter, validate(commentSchema), async (req, res, next)=>{
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
            const result = {
                id: req.body.comment_id,
                user_id:req.user.id,
                isAdmin: req.user.role === "admin"
            }
            await projComments.deleteProjComment(result)

            if (!deleted) {
                return res.status(404).json({
                    error: "Comment not found or you cannot delete it"
                })
            }

            return res.sendStatus(204)
        } catch (error) {
            next(error)
        }
    })

    router.post("/replyComment", requireAuth("admin", "owner"), (req, res, next)=>{
        try{
            commentReplies.createRow(req.body)
        } catch(error) {
            next(error)
        }
    })

    router.get("/getReply/:id", async (req, res, next)=>{
        try{
            const reply = await commentReplies.getTable(req.params.id)
            res.status(201).json(reply)
        } catch(error) {
            next(error)
        }
    })

    router.post("/deleteReply/:id", requireAuth("admin", "owner"), async (req, res, next)=>{
        try{
            await commentReplies.deleteReplyComment(req.params.id)
        }catch(error){
            console.error(error)
            next(error)
        }
    })

    return router
}
