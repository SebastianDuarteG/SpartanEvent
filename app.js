//app.js
// API for access to database
'use strict';
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const multer = require('multer');
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const INVALID_PARAM_ERROR = 400;
const SERVER_ERROR = 500;
const SERVER_ERROR_MSG = 'Something went wrong on the server.';
async function getDBConnection() {
const db = await sqlite.open({
filename: 'database.db',
driver: sqlite3.Database
});
return db;
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*'); 
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.get('/event', async function (req, res){
    try{
        let qry= 'SELECT eventId, title, eventDate, '+
            'eventTime, location, imgPath, description, flag, orgId '+
            'FROM event ORDER BY eventId DESC;';
        let db= await getDBConnection();
        let event = await db.all(qry);
        await db.close();
        res.json(event);
    } catch (err){
        res.type ('text');
        res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
    }
});

app.get('/event/search', async function (req, res){
    try{
        const eventId = req.headers.eventid;
        if (!eventId){
            return res.status(400).send("Invalid Request");
        }
        const query = `SELECT eventId, title, eventDate, 
        eventTime, location, imgPath, description, flag, orgId 
        FROM event WHERE eventId= ?`;
        const db= await getDBConnection();
        let event = await db.get(query, [eventId]);
        await db.close();
        res.json(event);
    } catch (err){
        res.type('text');
        res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
    }
});

app.post('/event/flag', async (req,res) => {
    try{
        const reqBody = {
            eventId: req.body.eventId,
        };
        if (!reqBody.eventId){
            return res.status(400).send("Invalid Request");
        }
        const query = `UPDATE organizer
            SET flag = 1
            WHERE orgId = (
			SELECT orgId
			FROM event
			WHERE eventId = ?);`;
        const db= await getDBConnection();
        await db.run(query, [reqBody.eventId]);
        await db.close();
    } catch (err){
        res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
    }
});

app.post('/event/delete', async (req,res) => {
    try{
        const reqBody = {
            eventId: req.body.eventId,
        };
        if (!reqBody.eventId){
            return res.status(400).send("Invalid Request");
        }
        const query = `DELETE FROM event WHERE eventId= ?;`;
        const db= await getDBConnection();
        await db.run(query, [reqBody.eventId]);
        await db.close();
    } catch (err){
        res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
    }
});

app.get('/comment/search', async function (req, res){
    try{
        const eventId = req.headers.eventid;
        if (!eventId){
            return res.status(400).send("Invalid Request");
        }
        const query = `SELECT comment.content, comment.userId, comment.eventId,
        user.userName 
        FROM comment, user 
        WHERE comment.eventId= ?
        AND comment.userId = user.userId;`;
        const db= await getDBConnection();
        let comment = await db.all(query, [eventId]);
        await db.close();
        res.json(comment);
    } catch (err){
        res.type('text');
        res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
    }
});

app.post('/comment/flag', async (req,res) => {
    try{
        const reqBody = {
            userId: req.body.userId,
        };
        if (!reqBody.userId){
            return res.status(400).send("Invalid Request");
        }
        const query = `UPDATE user
        SET flag = 1
        WHERE userId= ?;`;
        const db= await getDBConnection();
        await db.run(query, [reqBody.userId]);
        await db.close();
    } catch (err){
        res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
    }
});

app.post('/comment/delete', async (req,res) => {
    try{
        const reqBody = {
            userId: req.body.userId,
            eventId: req.body.eventId,
        };
        if (!reqBody.eventId || !reqBody.userId){
            return res.status(400).send("Invalid Request");
        }
        const query = `DELETE FROM comment WHERE userId= ?
        AND eventId=?;`;
        const db= await getDBConnection();
        await db.run(query, [reqBody.userId, reqBody.eventId]);
        await db.close();
    } catch (err){
        res.status(SERVER_ERROR).send(SERVER_ERROR_MSG);
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT);