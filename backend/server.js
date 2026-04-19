import express from "express"
import session from "express-session"
import authRouter from "./routes/auth.js"
import apiRouter from "./routes/api.js"
import passport from "passport"
import {initLocalStrategy} from "./auth/localstrategy.js"
//import requireAuth from "./auth/accessRole.js"
import dotenv from "dotenv"
dotenv.config({path: new URL("./.env","file:///Users/benz/Desktop/bennyjz/")})
import path from "path";
import {fileURLToPath} from "url";

import cors from "cors";

const app = express();


const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename)

const reactPath = path.join(_dirname,"..","frontend","dist")

app.use(express.static(reactPath));

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

app.use("/api",apiRouter)

app.get("/authCheck", (req,res,next)=>{
    if (req.isAuthenticated()){
        return res.json({authenticated:true, user:req.user,status:"Success"})
    } else {
        return res.json({authenticated: false})
    }
})

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.get("/{*splat}",(req,res)=>{
    res.sendFile(path.join(reactPath,"index.html"));
})


app.listen(process.env.PORT, "0.0.0.0")