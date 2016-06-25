BEGIN;
DROP DATABASE IF EXISTS gpstracker;
CREATE DATABASE gpstracker;

DROP TABLE if EXISTS users;
CREATE TABLE users (
	id SERIAL, PRIMARY KEY,
	username VARCHAR(40), NOT NULL,
	password bytea, NOT NULL,
	registeredon bigint,
	lastlogin bigint,
	usertype string,
	realname string,
);

DROP TABLE IF EXISTS devices;
CREATE TABLE devices (
	deviceid SERIAL, PRIMARY KEY,
	ownerid INT references users(id),
	name string,
	description TEXT,
	type string,
	brand string,
	model string,
	year INT,
	status string
);

DROP TABLE IF EXISTS coordinates;
CREATE TABLE coordinates (
	id SERIAL, PRIMARY KEY,
	deviceid int references devices(deviceid),
	latitude double precision,
	longitude double precision,
	ts bigint
);
COMMIT;
