const baseurl = "http://localhost:3000"
import dotenv from "dotenv"
dotenv.config({path: new URL("./.env","file:///Users/benz/Desktop/bennyjz/")})
console.log(process.env.BASEURL)

export {
    baseurl
}