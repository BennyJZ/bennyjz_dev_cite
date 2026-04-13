import db from "../db/connection.js"

//id, username, username, email, phone, password_hash, created_at, updated_at

const allowedRoles = ["admin", "owner", "guest"]

async function createRow({ username, email, phone, role}){

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("INVALID EMAIL");
    }
    if(!/^\d+$/.test(phone)){
        throw new Error("INVALID PHONE NOT DIGITS");
    }
    if (!allowedRoles.includes(role)) {
        throw new Error("NOT A VALID ROLE");
    }
    try {
        const result = await db.query("INSERT INTO users (username, email, phone, role) VALUES ($1, $2, $3, $4) RETURNING *",
            [username, email, phone, role])
        return result.rows[0] || null
    } catch (err) {
        console.error(err.message)
        throw err
    }
}

async function getRowByUsername(username) {
    try {
        const result = await db.query("SELECT * FROM users WHERE username=$1", [username])
        return result.rows[0] || null
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

async function getRowByEmail(email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("INVALID EMAIL");
    }
    try {
        const result = await db.query("SELECT * FROM users WHERE email=$1", [email])
        return result.rows[0] || null
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

async function getRowById(id) {
    try {
        const result = await db.query("SELECT * FROM users WHERE id=$1", [id])
        return result.rows[0] || null
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

async function updateUser(id, columnName, value){
    const now = new Date()
    const allowedColumns = ["username", "email", "phone", "password_hash", "role"]

    if (!allowedColumns.includes(columnName)){
        throw new Error("INVALID COLUMN NAME: username, email, phone, password_hash, role" )
    }else if (columnName === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
            throw new Error("INVALID EMAIL");
        }
    } else if (columnName === "phone") {
        if (!/^\d+$/.test(value)){
            throw new Error("INVALID PHONE NOT DIGITS");
        }
    } else if (columnName === "role") {
        if (!allowedRoles.includes(value)) {
            throw new Error("NOT A VALID ROLE");
        }
    }

    try {
        const result = await db.query(`UPDATE users SET ${columnName} = $1, updated_at = $2 WHERE id = $3 RETURNING *`, 
            [value, now, id])
            return result.rows[0] || null
    } catch (err) {
        console.error(err.message)
        throw err
    }
}

async function deleteUser(id){
        try {
        const result = await db.query("DELETE FROM users WHERE id=$1 RETURNING *",[id]);
        return result.rows[0] || null
    } catch (err) {
        console.error(err.message)
        throw err;
    }
}

async function clearTable(){
    try {
        await db.query("TRUNCATE TABLE users CASCADE")
    } catch (error) {
        console.error(error.message)
        throw error;
    }
}


export {
    createRow,
    getRowByEmail,
    getRowByUsername,
    getRowById,
    updateUser,
    deleteUser,
    clearTable
}