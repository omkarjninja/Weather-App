const express= require("express");
const bodyParser=require("body-parser");
const https= require("https");
const app= express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
  console.log("post req recivied");
  const city=req.body.cityName;
  const apikey="f94e29a28c6701444dd46bf288788198";
  console.log(city);
 const url="https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=f94e29a28c6701444dd46bf288788198&units=metric#";
    https.get(url, function(responses){
      console.log(responses.statusCode);

      responses.on("data",function(data){
        const weatherData = JSON.parse(data);
        // console.log(weatherData);
        const temp=weatherData.main.temp;
        // console.log(temp);
        const cloud=weatherData.weather[0].description;
        // console.log(cloud);
        const location=weatherData.name;
        const icon=weatherData.weather[0].icon;
        console.log(icon);
        const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write("<h1>Your Location is "+ location +"</h1>" + "<a href='https://earth.google.com/web/search/16.8333%c2%b0,75.7%c2%b0/@16.83329985,75.69999968,631.90335309a,1006.02397834d,35y,64.14311174h,44.97135166t,0r/data=ClQaKhIkGb3BFyZT1TBAIc3MzMzM7FJAKhAxNi44MzMzwrAsNzUuN8KwGAIgASImCiQJjg74yxQFTUAR1JYpYF0pRsAZljytVMPGUkAhPuVDOjWKPMA' target=_blank>Click here</a>");
        res.write("<h3>the tempertaure is "+ temp +" degree celsius in "+ location + "</h1>");
        res.write("<p>and the climate is "+cloud +"</p>");
        // res.write(https://openweathermap.org/img/wn/09n@2x.png);
        res.write("<img src="+imageURL+">");
        res.send();
      })
    })
})


app.listen(3000,function(){
    console.log("server has been started");
})