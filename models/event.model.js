"use strict";
const db = require("./db-conn");
const path = require("path");

// model functions to make queries to the db

function getEventsByOrgId(orgId) {
  const sql = "SELECT * FROM event WHERE orgId = ?";
  return db.all(sql, orgId);
}

function createEvent(eventData) {
  const { title, eventDate, eventTime, location, imgPath, description, orgId } = eventData;
  const sql = "INSERT INTO event (title, eventDate, eventTime, location, imgPath, description, orgId, flag) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  return db.run(sql, title, eventDate, eventTime, location, imgPath, description, orgId, 0);
}

function deleteEvent(eventId) {
  const sql = "DELETE FROM event WHERE eventId = ?";
  return db.run(sql, eventId);
}

module.exports = {
  // export the functions
  getEventsByOrgId,
  createEvent,
  deleteEvent,
};