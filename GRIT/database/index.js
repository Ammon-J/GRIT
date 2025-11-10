const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();


dotenv.config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, // e.g., 'yourserver.database.windows.net'
    port: 1433,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true, // For Azure SQL Database
        trustServerCertificate: false // Change to true for local dev / self-signed certs
    }
};

async function connectAndQuery() {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM Videos`;
        console.log(result.recordset);
    } catch (err) {
        console.error('Database connection or query error:', err);
    } finally {
        await sql.close();
    }
}

connectAndQuery();