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
router.get('/', (req, res) => {
    console.log('in GET');
  
    let sqlText = `SELECT * FROM "koala";`
    pool.query(sqlText)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('Got an error on SELECT query', error);
        res.sendStatus(500);
      })
  
  })

// POST


// PUT


// DELETE

module.exports = koalaRouter;