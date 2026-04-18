//id, username, username, email, phone, password_hash, created_at, updated_at
async function create(db){
    try {
        await db.query("CREATE TABLE users (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), username TEXT NOT NULL UNIQUE, email TEXT NOT NULL UNIQUE, phone TEXT NOT NULL UNIQUE, role TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
    } catch (error) {
        console.error(error)
        throw error;
    }
};

async function drop(db) {
    try {
        await db.query("DROP TABLE users")
    } catch (error) {
        console.error(error)
        throw error;
    }
}

async function empty(db){
    try {
        await db.query("TRUNCATE TABLE users")
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