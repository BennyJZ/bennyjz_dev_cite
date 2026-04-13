import * as user from "../models/users.js"
import * as creds from "../models/credentials.js"
import bcrypt from "bcrypt"

async function encryptPass(userId, password) {
    try {
        const result = await user.getRowById(userId)
        const password_hash = await bcrypt.hash(userId+":"+result.username+":"+password,5)
        const credResult = await creds.getRowByUserId(userId)
        
        if (credResult){
            await creds.updateCredentials(userId, password_hash)
        } else {
            await creds.createRow(userId, password_hash);
        }
    } catch (err){
        console.error(err.message)
        throw err;
    }
}

export default encryptPass;