import { Strategy as LocalStrategy, Strategy } from "passport-local"
import bcrypt from "bcrypt"
import * as user from "../models/users.js"
import * as creds from "../models/credentials.js"

function initLocalStrategy(passport) {
    passport.use(new LocalStrategy(async function verify(username, password, cb){
        try {
            const resultUser = await user.getRowByUsername(username)
            if (!resultUser){
                return cb(null, false)
            }
            const resultPass = await creds.getRowByUserId(resultUser.id)
            const match = await bcrypt.compare(resultPass.user_id+":"+username+":"+password, resultPass.password_hash)
            if (match) {
                return cb(null, resultUser)
            } else {
                return cb(null, false)
            }

        } catch (error) {
            return cb(error)
        }
    }))
}

export {
    initLocalStrategy
};