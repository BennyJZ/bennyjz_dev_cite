async function create(db) {
    try {
        await db.query("CREATE TABLE proj_likes (user_id UUID NOT NULL, proj_id UUID NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (user_id, proj_id), CONSTRAINT fkey_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, CONSTRAINT fkey_projCards FOREIGN KEY (proj_id) REFERENCES proj_cards(id) ON DELETE CASCADE)")
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function drop(db) {
    try {
        await db.query("DROP TABLE proj_likes")
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function empty(db) {
    try {
        await db.query("TRUNCATE TABLE proj_likes")
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