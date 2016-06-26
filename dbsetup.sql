DROP DATABASE IF EXISTS gpstracker;
CREATE DATABASE gpstracker;

\connect gpstracker

BEGIN;

DROP TABLE IF EXISTS coordinates;
DROP TABLE IF EXISTS devices;
DROP TABLE if EXISTS users;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(40) NOT NULL,
	password bytea NOT NULL,
	salt VARCHAR(32),
	registeredon timestamp WITH TIME ZONE,
	lastlogin timestamp WITH TIME ZONE,
	usertype VARCHAR(20),
	realname TEXT
);

CREATE TABLE devices (
	deviceid SERIAL PRIMARY KEY,
	ownerid INT references users(id),
	name VARCHAR(100),
	description TEXT,
	type VARCHAR(50),
	brand VARCHAR(50),
	model VARCHAR(20),
	year INT,
	status BOOLEAN
);

CREATE TABLE coordinates (
	id SERIAL PRIMARY KEY,
	deviceid int references devices(deviceid),
	latitude double precision,
	longitude double precision,
	ts bigint
);

COMMIT;
