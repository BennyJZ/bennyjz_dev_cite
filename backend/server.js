import express from "express"
import session from "express-session"
import authRouter from "./routes/auth.js"
import passport from "passport"
import {initLocalStrategy} from "./auth/localstrategy.js"
import requireAuth from "./auth/accessRole.js"
import dotenv from "dotenv"
dotenv.config({path:new URL("./.env", import.meta.url)})

import cors from "cors";

const app = express();

app.use(cors({ origin: process.env.FRONTEND, credentials:true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize())
app.use(passport.session())

initLocalStrategy(passport)
passport.serializeUser((user,cb)=>{
    cb(null,user)
})
passport.deserializeUser((user,cb)=>{
    cb(null,user)
})

app.use("/auth",authRouter);

app.get("/api",requireAuth("owner","admin","guest"))

app.get("/authCheck", (req,res,next)=>{
    if (req.isAuthenticated()){
        return res.json({authenticated:true, user:req.user,status:"Success"})
    } else {
        return res.json({authenticated: false})
    }
})



app.listen(process.env.PORT, "0.0.0.0")