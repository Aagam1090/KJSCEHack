const express = require('express'); //Calling Express NPM
const app = express(); //Initialize App with Express Object
const path = require('path'); //Path NPM for static rendering
const mysql = require('mysql');  //MySQL NPM for connection with local host  
const bodyParser = require('body-parser'); //Body-Parser NPM for taking data from the HTML Page and Parsing it 


app.use(express.static(path.join(__dirname, 'public'))); // Link to Public Folder as Static Files
app.use(bodyParser.urlencoded({extended:true})); //Permission to Body-Parser


//Login Page Redering 
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
});

app.post("/",function(req,res)
{
  var email = req.body.email;
  var password = req.body.pass;
});

//Register Page Redering 
app.get('/register',function(req,res)
{
  res.sendFile(path.join(__dirname + '/register.html'));
})

app.post('/register',function(req,res)
{

  
})


// Port Declaration of the Server
app.listen(3000,function()
{
    console.log('Listening on Port 3000')
});