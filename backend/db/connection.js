import pkg from "pg"
import "../config/env.js"

const db = new pkg.Pool({
    host:process.env.PG_HOST,
    user:process.env.PG_USER,
    database:process.env.PG_DB,
    password:process.env.PG_PASS
})


export default db