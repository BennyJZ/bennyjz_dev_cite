import * as user from "./models/users.js"
import * as creds from "./models/credentials.js"
import encryptPass from "./utils/encryptPassword.js"

const data = {
    username:"Bdwqdw",
    email:"bshidwadawzle@eemail.com",
    phone:"9882789289",
    password_hash:"password123",
    role:"admin"
}


await user.clearTable()
await creds.clearTable()
