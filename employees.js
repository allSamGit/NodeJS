
const  http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mysql = require('mysql');
var nStatic = require('node-static');
var url = require('url');
var fs = require('fs');

var fileServer = new nStatic.Server('./public');


   



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
 * Get Single Item (View)
 *
 * @return response()
 */
app.post('/view',(req, res) => {

  let data = [req.body.id];
  
  
  let sqlQuery = 'SELECT id ID, title Title FROM items WHERE id =?';
  
    
  let query = conn.query(sqlQuery,data,(err, results) => {
    if(err) throw err;
    res.send(results);
    
  });
});
   
/**
 * Create New Item
 *
 * @return response()
 */
app.post('/add',(req, res) => {

 // console.log(req.body.id);
  let data = [req.body.title,req.body.body];
  
  let sqlQuery = 'INSERT INTO items(title,body) VALUES(?,?)';
  
  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
    //res.send(` ID: ${row.ID},    Name: ${row.NAME}`);
    //console("entry displayed successfully");
  });
});

 
/**
 * Update Item
 *
 * @return response()
 */
app.post('/update',(req, res) => {
    let data = [req.body.title,req.body.id];
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
app.post('/delete',(req, res) => {
  
  let data = [req.body.id];
  let sqlQuery = "DELETE FROM items WHERE id=?";
    
  let query = conn.query(sqlQuery,data, (err, results) => {
    if(err) throw err;
    console.log(req.body.id);
      res.send(apiResponse(results));
  });
});

/**
 * Sort Items
 *
 * @return response()
 */

app.get('/sort',(req, res) => {
  
  let data = [req.body.column];
  let sqlQuery = "SELECT * FROM items ORDER BY ? DESC";
    
  let query = conn.query(sqlQuery,data, (err, results) => {
    if(err) throw err;
    console.log(req.body.id);
      res.send(apiResponse(results));
  });
});

/**
 * close connection
 *
 * @return response()
 */

app.get('/close',(req, res) => {
  conn.end(function(err) {
    if (err) {
    return console.log('error:' + err.message);
    }
    console.log('Close the database connection.');
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
var server=app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/employee.html'));
  });

app.use(express.static(__dirname + '/'));


/*
server.close(()=>{

  http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      } 
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }).listen(3000);

});
*/