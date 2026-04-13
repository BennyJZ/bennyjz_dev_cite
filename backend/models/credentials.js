import db from "../db/connection.js"

async function createRow(userId, password_hash){
    try {
        const result = await db.query("INSERT INTO credentials (user_id, password_hash) VALUES ($1, $2) RETURNING *", [userId, password_hash])
        return result.rows[0] || null
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

async function getRowByUserId(userId){
    try {
        const result = await db.query("SELECT * FROM credentials WHERE user_id=$1",[userId])
        return result.rows[0] || null
    } catch (error) {
        console.error(error.message)
        throw error;
    }
}

async function updateCredentials(userId, password_hash){
    try {
        const now = new Date()
        const result = await db.query("UPDATE credentials SET password_hash=$1, updated_at=$2 WHERE user_id=$3 RETURNING *", 
            [password_hash, now, userId])
        return result.rows[0] || null
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

async function deleteUser(id){
        try {
        const result = await db.query("DELETE FROM credentials WHERE id=$1 RETURNING *",[id]);
        return result.rows[0] || null
    } catch (err) {
        console.error(err.message)
        throw err;
    }
}

async function clearTable(){
    try {
        await db.query("TRUNCATE TABLE credentials CASCADE")
    } catch (error) {
        console.error(error.message)
        throw error;
    }
}

export {
    createRow,
    getRowByUserId,
    updateCredentials,
    deleteUser,
    clearTable
}