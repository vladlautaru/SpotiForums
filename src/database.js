const mariadb = require('mariadb');

// Create a connection pool
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'spotiforums_db',
    connectionLimit: 5 // Adjust according to your needs
});

// Function to execute a query
async function executeQuery(query) {
    let conn;
    try {
        // Get a connection from the pool
        conn = await pool.getConnection();

        // Return the query
        return await conn.query(query);
    } catch (err) {
        // Handle errors
        console.error("Error executing query:", err);
        throw err;
    } finally {
        // Release the connection back to the pool
        if (conn) {
            conn.release();
        }
    }
}

// Export the function to be used in other modules
module.exports = {
    executeQuery
};