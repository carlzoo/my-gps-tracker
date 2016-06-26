var config=require('./config');
var pgp=require('pg-promise')();

var db={};

var cn= {
	host:config.pghost,
	port:config.pgport,
	database:config.pgdb,
	user:config.pguser,
	password:config.pgpass,
};

var dbo=pgp(cn);

//query functions
var insertCoordinates = function(deviceid, lat,long,ts){
	dbo.any("INSERT INTO coordinates (deviceID,latitude,longitude,ts) VALUES ($1,$2,$3,$4)",[deviceid,lat,long,ts])
		.then(function() {
			return 0;		
		})
		.catch(function (error) {
			return error;		
		});
};

db.insertCoordinates=insertCoordinates;

module.exports=db;
