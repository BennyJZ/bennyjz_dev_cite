export default function validate(schema, source = "body") {
    return (req, res, next) => {
        const result = schema.safeParse(req[source])

        if (!result.success) {
            return res.status(400).json({
                error: `Invalid request ${source}`,
                issues: result.error.issues
            })
        }

        if (source === "body") {
            req.body = result.data
        } else {
            res.locals[source] = result.data
        }

        next()
    }
}