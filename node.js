var http=require('http');
var express=require('express');
var app=express();
var path    = require("path");
var mongoose = require('mongoose');
var bodyParser= require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/mydb');
var db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open", function(callback){
  console.log("Connection Successful");
})

var schema=mongoose.Schema;

var mySchema=mongoose.Schema({
  name: {type: String, required:true},
  email: {type:String, required:true, index:{unique:true}},
  username: {type:String, required:true, index:{unique:true}},
  password: {type: String, required:true}
})

var User=mongoose.model("User", mySchema);



app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/myaction',function(req,res){
  var Data=new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  Data.save(function(error){
    console.log("Your data has been saved");
    if(error){
      console.error(error);
    }
  })
  res.send("Hello");
})

app.listen(3000, function() {
  console.log('listening on 3000')
});
