import db from ".././db/connection.js"

async function createRow({image_url, proj_title, description, tag, link}){
    try {
        await db.query("INSERT INTO proj_cards (image_url, proj_title, description, tag, link) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [image_url, proj_title, description, tag, link]
        )
    } catch (error) {
        console.error(error)
        throw error;
    }
}


async function getTable(){
    try {
        const res = await db.query("SELECT * FROM proj_cards ORDER BY created_at DESC");
        return res
    } catch (error) {
        console.error(error)
        throw error;
    }
}

async function updateProjCards(id, columnName, value){
    try {
        const allowedColumns = ["image_url", "proj_title", "description", "tag", "link"]
        if (!allowedColumns.includes(columnName)){
            throw new Error("INVALID COLUMN NAME")
        }
        const res = await db.query(`UPDATE proj_cards SET ${columnName}=$1 WHERE id=$2 RETURNING *`,
            [value, id]
        )
        return res.rows[0] || null

    } catch (error) {
        console.error(error)
        throw error;
    }
}

async function deleteProjCard(id){
    try {
        const res = await db.query("DELETE FROM proj_cards WHERE id=$1 RETURNING *",
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
    updateProjCards,
    deleteProjCard
}