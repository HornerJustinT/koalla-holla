const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST


// PUT


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