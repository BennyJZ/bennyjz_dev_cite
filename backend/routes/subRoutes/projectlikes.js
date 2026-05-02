import express from "express";
import * as projLikes from "../../models/proj_likes.js"

export default function projectLikesRouter(){
    const router = express.Router()

    router.get("/getuserlikes",async (req,res)=>{
        if (!req.user) {
            return res.status(401).json({error:"Unauthorized"})
        }
        const result = await projLikes.getLikesByUser(req.user.id)
            res.json(result)
    })

    router.get("/getlikes", async (req, res)=>{
        const likesArray = []
        const result = await projLikes.getTable()
        result.rows.map(item=>{likesArray.push({proj_id:item.proj_id})})
        res.status(200).json(likesArray)
    })

    router.post("/like",async (req, res)=>{
        if (!req.user) {
            return res.status(401).json({error:"Unauthorized"})
        }
        const result = {user_id:req.user.id, proj_id:req.body.proj_id}
        const answer = await projLikes.createRow(result)
        if (!answer){
            await projLikes.deleteProjLikes(result)
            return res.json({ liked: false, proj_id: req.body.proj_id })
        }
        return res.json({ liked: true, proj_id: req.body.proj_id })
    })



    return router
}
