import express from "express"
import * as xp from "../../models/xp_cards.js"
import requireAuth from "../../auth/accessRole.js";

export default function experienceRouter(){
    
    const router = express.Router()

    router.post("/addxp", requireAuth("admin", "owner"), async(req,res,next)=>{
        try {
            await xp.createRow(req.body)
            res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    })

    router.get("/getxp", async (req, res, next)=>{
        try {
            const result = await xp.getTable()
            res.json(result)
        } catch (error) {
            next(error)
        }

    })

    return router
}


