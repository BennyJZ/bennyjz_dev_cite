async function create(db) {
    try {
        await db.query("CREATE TABLE proj_comment_replies (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL, projComments_id UUID NOT NULL, content TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, CONSTRAINT fkey_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, CONSTRAINT fkey_projcomments FOREIGN KEY (projComments_id) REFERENCES proj_comments(id) ON DELETE CASCADE)")
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function drop(db) {
    try {
        await db.query("DROP TABLE proj_comment_replies")
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function empty(db) {
    try {
        await db.query("TRUNCATE TABLE proj_comment_replies")
    } catch (error) {
        console.error(error)
        throw error
    }
}

export {
    create,
    drop,
    empty
}