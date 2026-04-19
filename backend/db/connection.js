import pkg from "pg"
import dotenv from "dotenv"
dotenv.config({path: new URL("./.env","file:///Users/benz/Desktop/bennyjz/")})

const db = new pkg.Pool({
    host:process.env.PG_HOST,
    user:process.env.PG_USER,
    database:process.env.PG_DB,
    password:process.env.PG_PASS
})


export default db