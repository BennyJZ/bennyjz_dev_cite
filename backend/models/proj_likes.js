import db from ".././db/connection.js"

async function createRow({user_id, proj_id}){
    try {
        const res = await db.query("INSERT INTO proj_likes (user_id, proj_id) VALUES ($1, $2) ON CONFLICT (user_id, proj_id) DO NOTHING RETURNING *",
            [user_id, proj_id]
        )
        return res.rows[0]
    } catch (error) {
        console.error(error)
        throw error;
    }
}

async function getTable(){
    try {
        const res = await db.query("SELECT * FROM proj_likes ORDER BY created_at DESC");
        return res
    } catch (error) {
        console.error(error)
        throw error;
    }
}

// GET LIST OF LIKES BY SPECIFIC USERS, or SPECIFIC PROJECTS

async function deleteProjLikes(user_id, proj_id){
    try {
        const res = await db.query("DELETE FROM proj_likes WHERE user_id=$1 AND proj_id=$2 RETURNING *",
            [user_id, proj_id]
        )
        return res.rows[0] || null
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export {
    createRow,
    getTable,
    deleteProjLikes
}