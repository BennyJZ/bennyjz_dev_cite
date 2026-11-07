import express from "express"
import experienceRouter from "./subRoutes/experience.js"
import projectRouter from "./subRoutes/project.js"
import commentRouter from "./subRoutes/project_comments.js"
import auth from "./auth.js"


export default function apiRouting(upload){
    const router = express.Router();
    router.use("/experience",experienceRouter())
    router.use("/projects", projectRouter(upload))
    router.use("/comment", commentRouter())
    return router
}



