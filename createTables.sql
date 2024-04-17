CREATE table user (
	userId   INTEGER PRIMARY KEY,
	userEmail varchar(50) NOT NULL UNIQUE,
	userPassword varchar (50) NOT NULL,
	flag int not null
);
create table admin(
	adminId		INTEGER PRIMARY KEY,
	adminEmail	varchar (50) NOT NULL UNIQUE,
	adminPassword varchar(50) NOT NULL
);
CREATE TABLE organizer(
	orgId	INTEGER PRIMARY KEY,
	orgEmail	varchar (50) NOT NULL UNIQUE,
	orgPassword		varchar(50) NOT NULL,
	flag	INT NOT NULL
);
CREATE TABLE event (
	eventId		INTEGER PRIMARY KEY,
	title	varchar (100) NOT NULL,
	eventDate	varchar (20) NOT NULL,
	eventTime	varchar (20) NOT NULL,
	location	varchar (100) NOT NULL,
	imgPath		varchar (200) NOT NULL,
	description	varchar (300) NOT NULL,
	flag	int NOT NULL,
	orgId   INTEGER NOT NULL,
	FOREIGN KEY (orgID) 
	REFERENCES organizer (orgID) 
	on DELETE CASCADE
	on UPDATE CASCADE
);
CREATE TABLE RSVP(
	userId INTEGER NOT NULL,
	eventId INTEGER NOT NULL,
	PRIMARY KEY (userId, eventId),
	FOREIGN KEY (userId)
	REFERENCES user (userId)
	on DELETE CASCADE 
	on UPDATE CASCADE,
	FOREIGN KEY (eventId)
	REFERENCES event (eventId)
	on DELETE CASCADE
	on UPDATE CASCADE
);
CREATE TABLE comment (
	content varchar (300) NOT NULL,
	userId	INTEGER NOT NULL,
	eventID	INTEGER NOT NULL,
	PRIMARY KEY (userId, eventId),
	FOREIGN KEY (userId)
	REFERENCES user (userId)
	on DELETE CASCADE
	on UPDATE CASCADE,
	FOREIGN KEY (eventId)
	REFERENCES event (eventId)
	on DELETE CASCADE
	on UPDATE CASCADE
);
