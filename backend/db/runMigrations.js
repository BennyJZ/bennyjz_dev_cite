import db from "./connection.js"
import * as users from "./migrations/001_create_users.js"
import * as credentials from "./migrations/002_create_credentials.js"
import * as xp_cards from "./migrations/003_create_experience.js"
import * as proj_cards from "./migrations/004_create_project.js"
import * as proj_comments from "./migrations/005_create_projComments.js"
import * as proj_likes from "./migrations/006_create_projLikes.js"
import * as proj_replies from "./migrations/007_create_projReplies.js"

async function setUpDb() {
    try {
    //Bear in mind the creation order due to Fkeys.
    //1st Prio Users
    await users.create(db)
    await credentials.create(db)
    await xp_cards.create(db)

    //1st Prio Proj_cards, 2nd Prio Proj_comments
    await proj_cards.create(db)
    await proj_comments.create(db)
    await proj_likes.create(db)
    await proj_replies.create(db)
    } catch (error) {
        console.error(error)
        throw error
    }
}


async function dropDb(){
    try {
        await users.drop(db)
        await credentials.drop(db)
        await xp_cards.drop(db)

        await proj_cards.drop(db)
        await proj_comments.drop(db)
        await proj_likes.drop(db)
        await proj_replies.drop(db)
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function emptyDb(){
    try {
        await users.empty(db)
        await credentials.empty(db)
        await xp_cards.empty(db)
        
        await proj_cards.empty(db)
        await proj_comments.empty(db)
        await proj_likes.empty(db)
        await proj_replies.empty(db)
    } catch (error) {
        console.error(error)
        throw error
    }
}

// setUpDb()
// dropDb()
// emptyDb()

    await xp_cards.empty(db)