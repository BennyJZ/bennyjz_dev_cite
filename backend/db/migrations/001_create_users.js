//id, username, username, email, phone, password_hash, created_at, updated_at
async function create(db){
    try {
        await db.query("CREATE TABLE users (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), username TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, phone TEXT NOT NULL UNIQUE, role TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
    } catch (error) {
        throw new Error("Trouble Creating Table")
    }
};

async function drop(db) {
    try {
        await db.query("DROP TABLE users")
    } catch (error) {
        throw new Error("Trouble Dropping Table")
    }
}

export {
    create,
    drop
}