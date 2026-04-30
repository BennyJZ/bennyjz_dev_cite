import express from "express";
import requireAuth from "../../auth/accessRole.js";
import encryptPass from "../../utils/encryptPassword.js";

const router = express.Router()

router.post("/updateuser",requireAuth("admin","guest","owner"), async (req,res,next)=>{
    try {
        encryptPass(req.user.id, req.body.confPswd)
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
})

export default router;