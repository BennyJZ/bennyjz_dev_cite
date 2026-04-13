//id, username, username, email, phone, password_hash, created_at, updated_at
async function create(db){
    try {
        await db.query("CREATE TABLE credentials (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL UNIQUE, password_hash TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)");
    } catch (error) {
        throw new Error("Trouble Create Table")
    }
};

async function drop(db) {
    try {
        await db.query("DROP TABLE credentials")
    } catch (error) {
        throw new Error("Trouble Dropping Table")
    }
}

export {
    create,
    drop
}