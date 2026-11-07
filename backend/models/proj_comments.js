import db from ".././db/connection.js"

async function createRow({user_id, proj_id, content, link}){
    try {
        if (!content || content.trim().length === 0) {
            throw new Error("NEED TO WRITE SOME CONTENT")
        }
        const res = await db.query(
            `INSERT INTO proj_comments (user_id, proj_id, content, link)
            VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [user_id, proj_id, content.trim(), link?.trim() || null]
        );
        return res.rows[0] || null
    } catch (error) {
        console.error(error)
        throw error;
    }
}

async function getTable(proj_id){
    try {
        const res = await db.query(
            "SELECT c.*, u.username FROM proj_comments c LEFT JOIN users u ON u.id = c.user_id WHERE c.proj_id = $1 ORDER BY c.created_at DESC",
            [proj_id]
        );
        return res.rows
    } catch (error) {
        console.error(error)
        throw error;
    }
}


async function getCommentsByUser(user_id) {
    try {
        const res = await db.query("SELECT * FROM proj_comments WHERE user_id=$1",
            [user_id]
        )
        return res.rows
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function updateProjComment(id, columnName, value){
    try {
        const allowedColumns = ["content"]
        if (!allowedColumns.includes(columnName)){
            throw new Error("INVALID COLUMN NAME")
        } else if (value.trim().length === 0){
            throw new Error("NEEDS SOME CONTENT DUDE")
        }
        const res = await db.query(`UPDATE proj_comments SET ${columnName}=$1 WHERE id=$2 RETURNING *`,
            [value.trim(), id]
        )
        return res.rows[0] || null

    } catch (error) {
        console.error(error)
        throw error;
    }
}

async function deleteProjComment({id, user_id, isAdmin = false}){
    try {
        const res = await db.query("DELETE FROM proj_comments WHERE id=$1 AND (user_id = $2 OR $3::boolean) RETURNING *",
            [id, user_id, isAdmin]
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
    updateProjComment,
    deleteProjComment
}