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
koalaRouter.get('/', (req, res) => {
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
koalaRouter.put('/:id', (req, res) => {
    let koalaId = req.params.id;
    let koalaInfo = req.body;
    console.log('In PUT to update koalas', koalaId, koalaInfo);

    let sqlText = `UPDATE "koala" SET "name" = $1, "gender" = $2,
      "age" = $3, "ready_to_transfer" = $4, "notes" = $5 WHERE "id" = $6;`;

    pool.query(sqlText, [koalaInfo.name, koalaInfo.gender, koalaInfo.age, koalaInfo.ready_to_transfer,
    koalaInfo.notes, koalaId])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error in PUT by id', error);
            res.sendStatus(500);
        })
})

// DELETE

module.exports = koalaRouter;