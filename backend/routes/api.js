import express from "express"
import experienceRouter from "./subRoutes/experience.js"
import projectRouter from "./subRoutes/project.js"


export default function apiRouting(upload){
    const router = express.Router();
    router.use("/experience",experienceRouter())
    router.use("/projects", projectRouter(upload))
    return router
}



