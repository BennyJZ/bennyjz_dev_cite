
async function create(db){
    try {
        await db.query("CREATE TABLE xp_cards (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), date TEXT NOT NULL, work_title TEXT NOT NULL UNIQUE, description TEXT, tag TEXT[], link TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")
    } catch (error) {
        throw new Error("Error Creating Table")
    }
}

async function drop(db){
    try{
        await db.query("DROP TABLE xp_cards")
    } catch (error){
        throw new Error("Error Creating Table")
    }
}

async function empty(db){
    try {
        await db.query("TRUNCATE TABLE xp_cards")
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export {
    create,
    drop,
    empty
}