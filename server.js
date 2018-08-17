// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp", function (req, res) {
 
  let date=new Date();
  res.json({unix:date.getTime(),utc:date.toUTCString()})
});
app.get("/api/timestamp/:time",function(req,res){
let time=req.params.time;
  
if(/([1-9]\d{1,}-(0[1-9]|1[0-2]|[1-9])-(0[1-9]|[12]\d|3[01]))$/.test(time)){
time=time.split("-");
time=new Date(time[0],time[1]-1,time[2]);
}  else if(/^\d{1,}$/.test(time))
{time=new Date(Number(time));
}else{res.json({error:"Invalid Date"})}
  res.json({unix:time.getTime(),utc:time.toUTCString()});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});