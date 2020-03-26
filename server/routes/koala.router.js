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

//DELETE - removes a koala
koalaRouter.delete('/:id', (req, res) => {
    // Need to know which koala we are deleting
    // Instead of using req.body for info, use req.params
    let koalaId = req.params.id
    console.log('In delete koala', koalaId);
  
    //Use SQL Param to substitute in the koalaID
    let sqlText = `DELETE FROM "koala" WHERE "id" = $1;`
    pool.query(sqlText, [koalaId])
      .then( result => {
        res.sendStatus(200);
      })
      .catch( (error) => {
        console.log('Error in delete by ID', error);
        res.sendStatus(500);
      })
  });//end DELETE

module.exports = koalaRouter;