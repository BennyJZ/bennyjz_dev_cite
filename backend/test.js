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


// await encryptPass("683083ee-406f-4f7c-913c-c5788fbfd350","spellchecka")

// await user.createRow(data)

await user.clearTable()
await creds.clearTable()
