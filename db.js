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
var insertCoordinates = function(deviceid, lat,long){
	dbo.any("INSERT INTO coordinates (id,deviceID,latitude,longitude,ts) VALUES ('',$1,$2,$3,'')",[deviceid,lat,long])
		.then(function() {
			return 0;		
		})
		.catch(function (error) {
			return error;		
		});
};

db.insertCoordinates=insertCoordinates;

module.exports=db;
