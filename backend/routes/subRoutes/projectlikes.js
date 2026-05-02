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
        const result = await projLikes.getTable()
        result.rows.map(item=>{item.proj_id})
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


// REMEMBER TO ADD A TOGGLE LIKE OR NO LIKE FUNCTION, MAYBE RETURN PROJECT ID, 
// IF USER LIKES A PROJECT THEN ITERATE AND SEE IF WE SHOULD RETURN A LIKE OR NOT
// FRONTEND: IF USER AUTHENTICATED > USER LIKES PROJECT > RETURN PROJECT ID.
// BACKEND: RECIEVE PROJECT ID, ITERATE PROJ_LIKES LIST.INCLUDES PROJECT_ID AND USER_ID. 