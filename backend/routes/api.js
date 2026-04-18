import express from "express"
import requireAuth from "../auth/accessRole.js";
import encryptPass from "../utils/encryptPassword.js";
import * as xp from ".././models/xp_cards.js"


const router = express.Router();

router.post("/updateuser",requireAuth("admin","guest","owner"), async (req,res,next)=>{
    try {
        encryptPass(req.user.id, req.body.confPswd)
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
})

router.post("/addxp", async(req,res,next)=>{
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
        res.json(result.rows)
    } catch (error) {
        next(error)
    }

})

export default router;