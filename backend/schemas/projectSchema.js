import { z } from "zod"
import { commentSchema } from "./commentSchema.js"

export const projectImageParamsSchema = z.object({
    filename: z.string().regex(
        /^[a-f0-9]{32}$/,
        "Invalid image filename"
    )
})


export const createProjectSchema = z.object({
    proj_title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    tag: z.string().transform(value =>
        value.split(",").map(tag => tag.trim()).filter(Boolean)
    ),
    link: commentSchema.shape.link
})