const express = require('express');
const bp = require('body-parser');
const rq = require("request");
const https = require('https');
// adding mailchimp
const client = require("@mailchimp/mailchimp_marketing");

// setting up mailchimp
client.setConfig({
  apiKey: "43f3fa12a77f6cecc446c71319e6526f-us17",
  server: "us17",
})

// setting up the bodyparser to the server so that we can able to get data from the

const server = express();
server.use(bp.urlencoded({
  extended: true
}));

// so if you try to use local file in the localhost so just declare a variable
server.use(express.static("public"));
// so you can fetch local files as input
// you have specify local files like youre using it from that local folder

// port is dynamic heroku port
server.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port no : " + process.env.PORT);
});

server.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


server.post("/", function(req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  var email = req.body.email;
  const birthdate = req.body.bDate;

  console.log(firstName, lastName, email, birthdate);
  // console.log(firstName, lastName, email, birthdate);
  // here we are gping to create a object and assign value to paramters specified on mailchimp

  // this object is created according to mailchimp convection
  // every API HAS OWN input format
  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,

  }


  const run = async() => {
    const response = await client.lists.addListMember("ca59bc965a", {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      }

    });

    if (res.statusCode === 200) {

      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
  }

  run();


});
