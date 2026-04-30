import db from ".././db/connection.js"

async function createRow({user_id, projcomments_id, content}){
    try {
        if (!content || content.trim().length === 0) {
            throw new Error("NEED TO WRITE SOME CONTENT")
        }
        const res = await db.query("INSERT INTO proj_comment_replies (user_id, projcomments_id, content) VALUES ($1, $2, $3) RETURNING *",
            [user_id, projcomments_id, content.trim()]
        )
        return res.rows[0] || null
    } catch (error) {
        console.error(error)
        throw error;
    }
}


async function getTable(){
    try {
        const res = await db.query("SELECT * FROM proj_comment_replies ORDER BY created_at DESC");
        return res.rows
    } catch (error) {
        console.error(error)
        throw error;
    }
}

// GET LIST OF REPLIES FROM SPECIFIC USER, USE PROJECT_COMMENT_ID and USER ID
async function getRepliesByUser(user_id) {
    try {
        const res = await db.query("SELECT * FROM proj_comment_replies WHERE user_id=$1",
            [user_id]
        )
        return res.rows
    } catch (error) {
        console.error(error)
        throw error;
    }
}

async function updateProjReplies(id, columnName, value){
    try {
        const allowedColumns = ["content"]
        if (!allowedColumns.includes(columnName)){
            throw new Error("INVALID COLUMN NAME")
        } else if (value.trim().length === 0){
            throw new Error("NEEDS SOME CONTENT DUDE")
        }
        const res = await db.query(`UPDATE proj_comment_replies SET ${columnName}=$1 WHERE id=$2 RETURNING *`,
            [value.trim(), id]
        )
        return res.rows[0] || null

    } catch (error) {
        console.error(error)
        throw error;
    }
}

async function deleteProjReplies(id){
    try {
        const res = await db.query("DELETE FROM proj_comment_replies WHERE id=$1 RETURNING *",
            [id]
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
    updateProjReplies,
    deleteProjReplies
}