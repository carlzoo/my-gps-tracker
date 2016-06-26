DROP DATABASE IF EXISTS gpstracker;
CREATE DATABASE gpstracker;

BEGIN;

DROP TABLE IF EXISTS coordinates;
CREATE TABLE coordinates (
	id SERIAL PRIMARY KEY,
	deviceid int references devices(deviceid),
	latitude double precision,
	longitude double precision,
	ts bigint
);

DROP TABLE IF EXISTS devices;
CREATE TABLE devices (
	deviceid SERIAL PRIMARY KEY,
	ownerid INT references users(id),
	name VARCHAR(100),
	description TEXT,
	type VARCHAR(50),
	brand VARCHAR(50),
	model VARCHAR(20),
	year INT,
	status VARCHAR(10)
);

DROP TABLE if EXISTS users;
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(40) NOT NULL,
	password bytea NOT NULL,
	salt VARCHAR(32),
	registeredon timestamp WITH TIME ZONE USING users::text::timestamptz,
	lastlogin timestamp WITH TIME ZONE USING users::text::timestamptz,
	usertype VARCHAR(20),
	realname TEXT
);

COMMIT;
