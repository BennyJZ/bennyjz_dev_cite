import db from ".././db/connection.js"

async function createRow({date,work_title, description, tag, link}){
    try {
        await db.query("INSERT INTO xp_cards (date, work_title, description, tag, link) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [date, work_title, description, tag, link]
        )
    } catch (error) {
        console.error(error)
        throw error;
    }
}


async function getTable(){
    try {
        const res = await db.query("SELECT * FROM xp_cards ORDER BY created_at DESC");
        return res
    } catch (error) {
        console.error(error)
        throw error;
    }
}

async function updateXpCards(id, columnName, value){
    try {
        const allowedColumns = ["date", "work_title", "description", "tag", "link"]
        if (!allowedColumns.includes(columnName)){
            throw new Error("INVALID COLUMN NAME")
        }
        const res = await db.query(`UPDATE xp_cards SET ${columnName}=$1 WHERE id=$2 RETURNING *`,
            [value, id]
        )
        return res.rows[0] || null

    } catch (error) {
        console.error(error)
        throw error;
    }
}

async function deleteXpCard(id){
    try {
        const res = await db.query("DELETE FROM cp_cards WHERE id=$1 RETURNING *",
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
    getTable,
    updateXpCards,
    deleteXpCard
}