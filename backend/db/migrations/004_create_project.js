async function create(db) {
    try {
        await db.query("CREATE TABLE proj_cards (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), image_url TEXT, proj_title TEXT NOT NULL, description TEXT, tag TEXT[], link TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function drop(db) {
    try {
        await db.query("DROP TABLE proj_cards")
    } catch (error) {
        console.error(error)
        throw error
    }
}
async function empty(db) {
    try {
        await db.query("TRUNCATE TABLE proj_cards")
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