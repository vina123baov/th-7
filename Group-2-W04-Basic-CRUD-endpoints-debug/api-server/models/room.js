const { getPgClient } = require('./db.js');
var format = require('pg-format');

const all = async () => {
    const client = getPgClient();
    const sql = "SELECT * FROM room";
    try {
        await client.connect();
        const result = await client.query(sql);
        return result.rows;
    } catch (e) {
        console.log(e);
        return [];
    } finally {
        await client.end();
    }
};

const byId = async (id) => {
    const client = getPgClient();
    const sql = format("SELECT * FROM room WHERE room_id = %L", id);
    
    try {
        await client.connect();
        const result = await client.query(sql);
        const found = result.rows.length > 0;
        return {
            found: found,
            data: result.rows[0]
        };
    } catch (e) {
        console.log(e);
        return {
            found: false,
            data: null
        };
    } finally {
        await client.end();
    }
};

// Create a new room
const create = async (name, price) => {
    const client = getPgClient();
    const sql = format("INSERT INTO room (name, price) VALUES (%L, %L) RETURNING *", name, price);

    try {
        await client.connect();
        const result = await client.query(sql);
        return {
            success: true,
            room: result.rows[0]
        };
    } catch (e) {
        console.log(e);
        return {
            success: false,
            message: "Error creating room"
        };
    } finally {
        await client.end();
    }
};

// Update a room by ID
const update = async (id, req) => {
    const info = _.pick(req.params, ['name', 'price']);
    
const rowCount = await getKnex()('room')
        .where('room_id', '=', id)
    .update(info);

const success = rowCount > 0;

if (success) {
    return {
        success: true, message: "Room updated successfully", data: {room: info}
    };
} else {
    return {
        success: false, code: 1, message: `Cannot update room's information. Room with id ${id} does not exist.`,
    }
}
}

// Delete a room by ID
const deleteRoom = async (id) => {
    const client = getPgClient();
    const sql = format("DELETE FROM room WHERE room_id = %L", id);

    try {
        await client.connect();
        const result = await client.query(sql);
        const success = result.rowCount > 0;
        return {
            success: success,
            message: success ? "Room deleted successfully" : "Room not found"
        };
    } catch (e) {
        console.log(e);
        return {
            success: false,
            message: "Error deleting room"
        };
    } finally {
        await client.end();
    }
};

module.exports = {
    all,
    byId,
    create,
    update,
    deleteRoom
};
