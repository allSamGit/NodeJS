
const  http = require('http');
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
var server = http.createServer(app);
app.use(bodyParser.json());
app.use(express.json()); 
app.use(bodyParser.urlencoded({extended: true}));  
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

  let data = {id: req.body.id};
  var ids = '1';
  let sqlQuery = 'SELECT id ID, title Title FROM items WHERE id =?';
  
    
  let query = conn.query(sqlQuery,data,(err, results) => {
    if(err) throw err;
    res.send(results);
    
  });
});
   
/**
 * Create New Item
 *
 * @return /Insert/add
 */
app.post('/add',(req, res) => {

 // console.log(req.body.id);
  let data = {title: req.body.name, id: req.body.id};
  
  let sqlQuery = "INSERT INTO items(title,id) VALUES(?)";
  
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
app.put('/update/:id',(req, res) => {
    let data = {name: req.body.title, id: req.params.id};
  let sqlQuery = 'UPDATE items SET title = ? WHERE id = ?';
  
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
app.delete('/delete',(req, res) => {
  
  let sqlQuery = "DELETE FROM items WHERE id=?"+req.body.id+"";
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    console.log(req.body.id);
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

  app.use(express.static(__dirname + '/public'));


  

