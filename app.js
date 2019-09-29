const express = require('express'); //Calling Express NPM
const app = express(); //Initialize App with Express Object
const path = require('path'); //Path NPM for static rendering
const mysql = require('mysql');  //MySQL NPM for connection with local host  
const bodyParser = require('body-parser'); //Body-Parser NPM for taking data from the HTML Page and Parsing it 


app.use(express.static(path.join(__dirname, 'public'))); // Link to Public Folder as Static Files
app.use(bodyParser.urlencoded({extended:true})); //Permission to Body-Parser


//Database Connection File 

var con = mysql.createConnection({
  host : "localhost",
  user : "root",
  password : "",
  database : "kjsce"

});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//Login Page Redering 
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
});

app.post("/",function(req,res)
{
  var email = req.body.email;
  var password = req.body.pass;
  var sql = "Select Email,Password from user where Email = " + mysql.escape(email) + " and Password = " + mysql.escape(password);
  con.query(sql,function(err,result)
  {
    if(err)
    {
      app.redirect('/');
      console.log('Incorrect Id and Password');
    }
    else
    {
      res.redirect('/index.html');
    }
  });
});

//Register Page Redering 
app.get('/register',function(req,res)
{
  res.sendFile(path.join(__dirname + '/register.html'));
})

app.post('/register',function(req,res)
{
  var name = req.body.name;
  var email = req.body.email;
  var pass = req.body.pass;
  var phoneno = req.body.phoneno;
  var sql = "Insert into user values ( " + mysql.escape(name) + ","  + mysql.escape(email) + "," + mysql.escape(pass) + " , "  + mysql.escape(phoneno) + " )";
  con.query(sql,function(err,result)
  {
    if(err)
    {
      res.redirect('/register');
    }
    else
    {
      console.log('Value Inserted');
      res.redirect('/index');
    }
    
  })
})

//Index Page Rendering
app.get('/index.html',function(req,res)
{
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Port Declaration of the Server
app.listen(3000,function()
{
    console.log('Listening on Port 3000')
});