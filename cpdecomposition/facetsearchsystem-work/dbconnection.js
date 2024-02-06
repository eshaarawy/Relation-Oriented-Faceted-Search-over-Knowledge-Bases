const { Pool } = require('pg');
require('dotenv').config();

var config = {
    user: process.env.DB_USER, 
    database: process.env.DB_DATABASE, 
    password: process.env.DB_PASSWORD, 
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT, 
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000
    };
    
const db = new Pool(config);

module.exports = db