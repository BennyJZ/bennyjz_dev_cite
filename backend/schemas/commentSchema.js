import { z } from "zod";

export const commentSchema = z.object({
    content: z.string().trim().min(1).max(2000),

    link: z.string()
        .trim()
        .max(2048)
        .nullish()
        .transform(value => {
            if (!value) return null

            const hasProtocol = /^[a-z][a-z\d+.-]*:/i.test(value)
            const normalized = hasProtocol ? value : `https://${value}`

            const result = z.httpUrl().max(2048).safeParse(normalized)

            return result.success ? result.data : null
        }),

    proj_id: z.uuid()
});
