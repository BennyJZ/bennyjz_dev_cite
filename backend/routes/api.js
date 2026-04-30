import express from "express"
import userRouter from "./subRoutes/users.js"
import experienceRouter from "./subRoutes/experience.js"
import projectRouter from "./subRoutes/project.js"




const router = express.Router();

router.use("/users",userRouter)

router.use("/experience",experienceRouter)

router.use("/projects", projectRouter)

export default router;