const express = require('express');
const app = express();
const https = require('node:https');
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const cityname=req.body.city;
  const apikey="ca8ce5604b009c01a92e59598a7a5b7c";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+apikey+"&lang=en&units=metric";
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on('data', function(data) {
      const weatherData = JSON.parse(data);
      const desc=weatherData.weather[0].description;
      const temp=weatherData.main.temp;
      const icon=weatherData.weather[0].icon
      const iconurl= 'http://openweathermap.org/img/wn/'+icon+'@2x.png';
      console.log(iconurl);
      res.write("<p>The weather is "+desc+"</p>");
      res.write("<h1>The temperature in "+cityname+" is "+temp+"</h1>");
      res.write("<img src="+iconurl+" alt='icon image'>");
      res.send();
    });
  });
});


app.listen(3000, function() {
  console.log("Sever is running");
});
