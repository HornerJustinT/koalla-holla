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
koalaRouter.post( '/', ( req, res )=> {
    console.log( 'POST hit:', req.body );
  
    // SQL parameter to fill in the values - $1, $2, etc.
    let sqlText = `INSERT INTO "koala" 
        ("id", "name", "gender", "age", "ready_to_transfer", "notes) 
        VALUES ($1, $2, $3, $4, $5, $6);`
    // The array in the query holds the values to fill in     
    pool.query( sqlText, [req.body.id, req.body.name, 
        req.body.gender, req.body.age, req.body.readyForTransfer, req.body.notes] )
      .then( (result) => {
        res.sendStatus(200);
      })
      .catch( (error) => {
        console.log(`Error on INSERT:`, error);
        res.sendStatus(500);
      })
  })


// PUT


// DELETE

module.exports = koalaRouter;