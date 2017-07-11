var http=require('http');
var express=require('express');
var app=express();
var path    = require("path");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydb');

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});
app.post('/myaction',function(req,res){

})
app.listen(3000, function() {
  console.log('listening on 3000')
});
