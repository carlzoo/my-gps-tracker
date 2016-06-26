var express = require('express');
var config = require('./config');
var db=require('./db');
var app = express();
var router = express.Router();

app.get('/', function (req,res){
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/gps/:deviceid', function(req, res){
	//res.send('deviceid:' + req.query.deviceid);
	//res.send('latitude: ' + req.query.lat);
	//res.send('longitude: ' + req.query.long);
	var dbres=db.insertCoordinates(req.params.deviceid, req.query.lat,req.query.long,req.query.ts);
	if(dbres){
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({ status: "fail", msg : dbres }));		
	}
	else {
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({ status: "success"}));	
	}
});

app.get('/dashboard', function(req, res){
	//the dashboard to view data, to be completed later
});

//404 error
app.get('*', function(req,res){
	res.send('Nothing to see here!');
});

app.listen(config.appport, function () {
  console.log('GPS tracker listening on port ' + config.appport);
  console.log('Use Ctrl-C or Command-C to stop');
});
