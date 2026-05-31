import express from "express";
import * as proj_comments from "../../models/proj_comments.js";

export default function projCommentsRouter(){
    const router = express.Router()

    router.post("/addcomment",(req, res)=>{
        res.status(200)
    })

    return router
}