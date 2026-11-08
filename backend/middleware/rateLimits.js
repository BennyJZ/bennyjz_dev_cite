import { rateLimit } from "express-rate-limit"

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    message: { error: "Too many login attempts. Try again later." }
})

export const commentLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 5,
    keyGenerator: req => req.user.id,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "Too many submissions. Try again shortly." }
})