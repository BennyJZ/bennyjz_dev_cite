import db from ".././db/connection.js"

async function createRow({user_id, id, content}){
    try{
        if (!content || content.trim().length === 0) {
            throw new Error("NEED TO WRITE SOME CONTENT")
        }
        const res = await db.query(
            `INSERT INTO proj_comment_replies (user_id, projcomments_id, content) VALUES ($1, $2, $3) RETURNING *`,
            [user_id, id, content.trim()]
        );
        return res.rows[0] || null
    } catch(error){
        console.error(error)
        throw error;
    }
}

async function getTable(comment_id) {
    try{
        const res = await db.query(
            "SELECT * FROM proj_comment_replies WHERE projcomments_id=$1 ORDER BY created_at DESC",
            [comment_id]
        );
        return res.rows
    }catch(error){
        console.error(error)
        throw error
    }
}

async function deleteReplyComment(id) {
    try{
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
    deleteReplyComment,
    getTable
}