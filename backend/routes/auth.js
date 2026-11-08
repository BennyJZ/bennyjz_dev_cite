import express from "express"
import * as user from "../models/users.js"
import encryptPass from "../utils/encryptPassword.js";
import requireAuth from "../auth/accessRole.js";
import passport from "passport";
import { loginLimiter } from "../middleware/rateLimits.js"

export default function authRouter(){

    const router = express.Router();

    router.post("/login", loginLimiter, (req,res,next)=>{passport.authenticate("local",(err, user)=>{
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
            return res.status(200).json({success:true})
            })
        })(req, res, next);
    })

    router.post("/updateuser",requireAuth("admin","guest","owner"), async (req,res,next)=>{
        try {
            await encryptPass(req.user.id, req.body.confPswd)
            res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    })

    router.post("/register",requireAuth("admin","owner"), async (req, res, next)=>{
        try {
            const {username, email, phone, role, password} = req.body;
            const result = await user.createRow({username, email, phone, role});
            await encryptPass(result.id,password)
            res.status(201).json({ message: "User created" });
        } catch (error) {
            next(error)
        }
    })

    router.post("/logout", (req,res,next)=>{
        req.logout(err => {
            if (err) return next(err);
            res.clearCookie("connect.sid");
            res.status(200).json({message:"Logged Out"})
        })
    })

    router.get("/getUsername/:id",async (req, res, next)=>{
        try{
            console.log(req.params.id)
            const result = await user.getRowById(req.params.id)
            res.status(200).json(result.username)
        }catch(error){
            console.error(error)
            next(error)
        }
    })

    return router
}
