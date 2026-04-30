import express from "express";

import * as proj from "../../models/proj_cards.js"
import * as user from "../../models/users.js"

const router = express.Router()

router.post("/createproj",upload.single("image"), (req, res, next)=>{
    console.log(req.file)
})

export default router;