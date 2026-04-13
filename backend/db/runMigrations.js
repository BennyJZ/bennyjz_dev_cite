import db from "./connection.js"
import * as users from "./migrations/001_create_users.js"
import * as credentials from "./migrations/002_create_credentials.js"

async function setUpDb() {
    await users.create(db)
    await credentials.create(db)
}

async function dropDb(){
    await users.drop(db)
    await credentials.drop(db)
}

setUpDb()
// dropDb()