
const express = require('express');
const bp = require('body-parser');
const rq=require("request");

const server=express();
server.use(bp.urlencoded({extended:true}));

// so if you try to use local file in the localhost so just declare a variable
server.use(express.static("public"));
// so you can fetch local files as input
// you have specify local files like youre using it from that local folder
const port=3000;
server.listen(port,function(){
  console.log("server is running on port no : "+ port);
});

server.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

server.post("/",function(req,res){
  console.log(req.body);
  res.send("hello world");
});
