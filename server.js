const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql'); 
const bodyParser = require('body-parser');

function Dbinit(email_login,password_login)
{
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kjsce"
  });

  con.connect(function(err) 
  {
    if (err) throw err;
    var sql = "Select Name,Email,Password from user where Email  = " + mysql.escape(email_login) + " and Password = " + mysql.escape(password_login); 
    con.query(sql, function (err, result, fields) {
      if(result[0].Email ==  email_login && result[0].Password == password_login)
      {
        console.log('Welcome User ' + result[0].Name);
        return res.redirect('/UserHomePage');
      }
      else
      {
        console.log('Nikal Pehli Fursat mai');
        return res.redirect('/');
      }
    });
  });

}


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
});

app.post("/",function(req,res)
{
  var email = req.body.email;
  var password = req.body.pass;
  var i = Dbinit(email,password);
  //console.log(i);
});

app.listen(3000,function()
{
    console.log('Listening on Port 3000')
});