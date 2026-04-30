import express from "express";
import * as projLikes from "../../models/proj_likes.js"

export default function projectLikesRouter(){
    const router = express.Router()



    router.get("/getlikes",async (req,res,next)=>{
        const result = await projLikes.getTable()
        res.send(result.rows)
    })

    return router
}


// REMEMBER TO ADD A TOGGLE LIKE OR NO LIKE FUNCTION, MAYBE RETURN PROJECT ID, 
// IF USER LIKES A PROJECT THEN ITERATE AND SEE IF WE SHOULD RETURN A LIKE OR NOT
// FRONTEND: IF USER AUTHENTICATED > USER LIKES PROJECT > RETURN PROJECT ID.
// BACKEND: RECIEVE PROJECT ID, ITERATE PROJ_LIKES LIST.INCLUDES PROJECT_ID AND USER_ID. 