const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION

const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool({
    database: 'koala',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
})

pool.on('connect', () => {
    console.log('Database connection established...');
})

pool.on('error', (error) => {
    console.log('Database error:', error);
})

// GET


// POST


// PUT


// DELETE

module.exports = koalaRouter;