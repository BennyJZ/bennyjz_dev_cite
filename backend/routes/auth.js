import express from "express"
import * as user from "../models/users.js"
import encryptPass from "../utils/encryptPassword.js";
import passport from "passport";

const router = express.Router();

router.post("/register", async (req, res, next)=>{
    try {
        const {username, email, phone, role, password} = req.body;
        const result = await user.createRow({username, email, phone, role});
        await encryptPass(result.id,password)
        res.redirect("/").json({ message: "User created" });
    } catch (error) {
        next(error)
    }
})

router.post("/updateuser", async (req, res, next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
})

router.post("/login",(req,res,next)=>{passport.authenticate("local",(err, user)=>{
    if (err) {
        return next(err)
    }
    if (!user){
        return res.status(401).json({success: false})
    }
    
    req.logIn(user, (err)=>{
        if (err) {
            return next(err)
        }
        return res.redirect("/")
        })
    })(req, res, next);
})

router.post("/logout", (req,res,next)=>{
    req.logout(err => {
        if (err) return next(err);
        res.clearCookie("connect.sid");
        res.status(200).json({message:"Logged Out"})
    })
})

export default router;