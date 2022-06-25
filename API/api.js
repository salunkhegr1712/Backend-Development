const express=require("express");
// so now we are dealing with api so we will use node package called https
// by using https we can send get request and get responce from interval
// we have other choices also for that visit following website
//https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
const https = require('https');
const bp= require('body-parser');

const server=express();
server.use(bp.urlencoded({extended:true}));
const port= 8000;
server.listen(port,function(){
  console.log("the server is running on port 8000 !!");
});

server.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

server.post('/',function(req,res){
  // console.log(req.body);
  // console.log("the request is :: ");
  // console.log(req);
  var city=req.body.cityName;
  city=city.toLowerCase();
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=943b40f15433ddc035e9b4c69e88a1fa";
  // the https has function with paramater result which shows the result from api you get from it
  https.get(url,function(responce){
    // console.log(responce);
    // the responce you get can be ftechd with the help of the dot operator
    // console.log(responce.statusCode); //200
    // console.log(responce.statusMessage);//OK
    // console.log(responce.aborted);//false
    // console.log(responce.upgrade);//false
    if(responce.statusCode==404){
      res.sendFile(__dirname+"/index2.html");
    }
    else{
      // now we will fetch the data from the responce with on function having data as format
      responce.on("data",function(data){
        // it will send the chunk of hexadecimal bits
        // console.log(data);
        // output
        // <Buffer 7b 22 63 6f 6f 72 64 22 3a 7b 22 6c 6f 6e 22 3a 37 33 2e 38 35 35 33
        //  2c 22 6c 61 74 22 3a 31 38 2e 35 31 39 36 7d 2c 22 77 65 61 74 68 65 72 22
        //   3a 5b ... 453 more bytes>
        // if you covert above hexadecimal format to text you wil get the json
        const weatherData=JSON.parse(data);
        // console.log(weatherData);
        // to convert json to string use fiunction stringify()
        // const new1=stringify(weatherData);
        // console.log(new1);
        // json is object so we can fetch the data through .(dot) operator
        const coord=weatherData.coord
        const temp=weatherData.main.temp
        const desc=weatherData.weather[0].description;
        const img=weatherData.weather[0].icon;
        res.send("<h2>"+"place is: "+city+"<br>"+"Co-ordinates are : longitude = "+coord.lon +
        " lattitude = "+coord.lat+"<br>"+"temperature is: "+temp +" Degree Celcius "+"<br>"+" Weather Desc: "
        +desc+"</h2><br>"+"&nbsp &nbsp &nbsp <img src='http://openweathermap.org/img/wn/"+img+"@2x.png' alt='image-of-weather'>")
      });
    }


    // Generally, the on function registers an event handler for a specific event.

  })
  // so as of now from the responce we are come to a step where you can  use can get responce from the api server
  // so now our current goal is to create a responce in json as our broswer converts



});

//JSON REPLY FROM hexadecimal chunk
// console.log(weatherData);
// {
//   coord: { lon: 73.8553, lat: 18.5196 },
//   weather: [
//     {
//       id: 804,
//       main: 'Clouds',
//       description: 'overcast clouds',
//       icon: '04d'
//     }
//   ],
//   base: 'stations',
//   main: {
//     temp: 296.96,
//     feels_like: 297.64,
//     temp_min: 296.96,
//     temp_max: 296.96,
//     pressure: 1002,
//     humidity: 86,
//     sea_level: 1002,
//     grnd_level: 941
//   },
//   visibility: 10000,
//   wind: { speed: 4.58, deg: 232, gust: 10.18 },
//   clouds: { all: 100 },
//   dt: 1656157012,
//   sys: { country: 'IN', sunrise: 1656116992, sunset: 1656164656 },
//   timezone: 19800,
//   id: 1259229,
//   name: 'Pune',
//   cod: 200
// }


//http responce codes
// 404 not found
// 401 authorisation failed
//200 success


// steps to solve the problem
// first add required packages
// create and start listening to the server at the specified port // NOTE:
// now start to fetch the get requests
// now send the request from api and get responce
// parse the responce
// s
