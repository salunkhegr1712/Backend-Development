const express = require('express');
const bp = require('body-parser');
const rq = require("request");
const https = require('https');
// adding mailchimp
// const client = require("mailchimp-marketing");
// setting up mailchimp
// client.setConfig({
//   apiKey: "YOUR_API_KEY",
//   server: "YOUR_SERVER_PREFIX",
// });


const server = express();
server.use(bp.urlencoded({
  extended: true
}));

// so if you try to use local file in the localhost so just declare a variable
server.use(express.static("public"));
// so you can fetch local files as input
// you have specify local files like youre using it from that local folder
const port = 3000;
server.listen(port, function() {
  console.log("server is running on port no : " + port);
});

server.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

server.post("/", function(req, res) {
  console.log(req.body);
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const birthdate = req.body.bDate;

  // console.log(firstName, lastName, email, birthdate);
  // here we are gping to create a object and assign value to paramters specified on mailchimp

// this object is created according to mailchimp convection
// every API HAS OWN input format

  const data = {
    members:[
      {
      email_address:email,
      status: "subscribed",

      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
        BIRTHDAY:birthdate,
      }
    }
  ]
};

  // convert to data to object to json object and then we can send it to mailchimp
  const dataJSON=JSON.stringify(data);
  // console.log(dataJSON);

  const url="https://us17.api.mailchimp.com/3.0/lists/ca59bc965a/members";

  const options={
    method:"POST",
    auth:"salunkhegr1712@gmail.com:43f3fa12a77f6cecc446c71319e6526f-us17"
  }
  // so we are sending the request to the mail chimp with https module
  // this is syntax for https request
  // https.request(url,options,function(responce){
  //
  // })
  const request=https.request(url,options,function(responce){
    responce.on("data",function(data){
      console.log(JSON.parse(data));
    })
  });
  request.write(dataJSON);
  request.end();
  res.send("hello world");

});
