//id, username, username, email, phone, password_hash, created_at, updated_at
async function create(db){
    try {
        await db.query("CREATE TABLE credentials (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL UNIQUE, password_hash TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)");
    } catch (error) {
        console.error(error)
        throw error;
    }
};

async function drop(db) {
    try {
        await db.query("DROP TABLE credentials")
    } catch (error) {
        console.error(error)
        throw error;
    }
}

async function empty(db){
    try {
        await db.query("TRUNCATE TABLE credentials")
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