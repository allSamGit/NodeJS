const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mysql = require('mysql');
   
/*------------------------------------------
--------------------------------------------
parse application/json
--------------------------------------------
--------------------------------------------*/
app.use(bodyParser.json());
   
/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root', /* MySQL User */
  password: '', /* MySQL Password */
  database: 'node_restapi' /* MySQL Database */
});
   
/*------------------------------------------
--------------------------------------------
Shows Mysql Connect
--------------------------------------------
--------------------------------------------*/
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected with App...');
});
   
/**
 * Get All Items
 *
 * @return response()
 */

app.get('/api/items',(req, res) => {
  let sqlQuery = "SELECT * FROM items";
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Get Single Item
 *
 * @return response()
 */
app.get('/view',(req, res) => {
  let sqlQuery = "SELECT * FROM items WHERE id =?" + req.params.id;
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(results);
    console.log(results);
  });
});
   
/**
 * Create New Item
 *
 * @return /Insert/add
 */
app.post('/add',(req, res) => {
  let data = {title: req.body.title, body: req.body.body};
  
  let sqlQuery = "INSERT INTO emp(id,name) VALUES(?,?)";
  
  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
    res.send(` ID: ${row.ID},    Name: ${row.NAME}`);
    console("entry displayed successfully");
  });
});
   
/**
 * Update Item
 *
 * @return response()
 */
app.put('/update',(req, res) => {
    let data = {name: req.body.name, id: req.body.id};
  let sqlQuery = 'UPDATE emp SET name = ? WHERE id = ?';
  
  let query = conn.query(sqlQuery,data, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Delete Item
 *
 * @return response()
 */
app.delete('/api/items/:id',(req, res) => {
  let sqlQuery = "DELETE FROM items WHERE id="+req.params.id+"";
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
      res.send(apiResponse(results));
  });
});
  
/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}
   
/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/employee.html'));
  });

