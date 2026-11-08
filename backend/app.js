import express from "express"
import session from "express-session"
import authRouter from "./routes/auth.js"
import apiRouting from "./routes/api.js"
import passport from "passport"
import {initLocalStrategy} from "./auth/localstrategy.js"
import "./config/env.js"
import path from "path";
import {fileURLToPath} from "url";
import multer from "multer";
import { getRowById } from "./models/users.js"

import cors from "cors";

if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is required. Set it in the root .env file.");
}

const app = express();


const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename)

const reactPath = path.join(_dirname,"..","frontend","dist")
const assetsPath = path.join(_dirname, "assets","project")
const upload = multer({ dest: assetsPath})


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
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await getRowById(id)

        if (!user) {
            return done(null, false)
        }

        done(null, user)
    } catch (error) {
        done(error)
    }
})

app.use("/auth",authRouter());

app.use("/api",apiRouting(upload))

app.get("/authCheck", (req,res)=>{
    if (req.isAuthenticated()){
        return res.json({authenticated:true, user:req.user,status:"Success"})
    } else {
        return res.json({authenticated: false})
    }
})

app.get("/ping", (req, res) => {
    res.send("pong");
});

// Unknown API paths must return JSON rather than the React HTML page.
app.use(["/api", "/auth"], (req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.get("/{*splat}",(req,res)=>{
    res.sendFile(path.join(reactPath,"index.html"));
})


// Keep API errors consistent and avoid sending internal details to clients.
app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    console.error(error);
    const status = error.status >= 400 && error.status < 600 ? error.status : 500;
    res.status(status).json({ error: status === 500 ? "Internal server error" : error.message });
});

export default app;
