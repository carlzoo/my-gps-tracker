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
	console.log("deviceid: " + deviceid);
    console.log("lat: " + lat);
    console.log("long: " + long);
    console.log("ts: "+ ts);
    if(!ts || !deviceid || !long){
            console.log("insufficient parameters");
            return 0;
    }
	dbo.none("INSERT INTO coordinates (deviceID,latitude,longitude,ts) VALUES ($1,$2,$3,$4)",[deviceid,lat,long,ts])
            .then(function(data) {
                    console.log("success");
                    console.log(data);
                    return 0;
            })
            .catch(function (error) {
                    console.log("error");
                    console.log(error);
                    return error;
            });

};

db.insertCoordinates=insertCoordinates;

module.exports=db;
