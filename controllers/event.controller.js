"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/event.model");
//controller functions to render content in ejs/html pages below

async function getOrgEvents(req, res) {
  try {
    const orgId = req.params.id;
    const events = await model.getEventsByOrgId(orgId);
    res.render("organizer", { orgId, events });// Pass orgId to the view
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function createEvent(req, res) {
  try {
    const eventData = req.body; // Event data from the form
    console.log("eventData:", eventData); // Log eventData to verify its value
    const orgId = req.params.id; // Retrieve orgId from URL parameters
    console.log("orgId:", orgId); // Log orgId to verify its value
    eventData.orgId = orgId; // Add orgId to event data
    const result = await model.createEvent(eventData);// Save event to database
    res.redirect('/SpartanEvent/OrganizerEvents/' + orgId); // Redirect back to organizer page
  } catch (error) {
    console.error("Error saving event:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function deleteEvent(req, res) {
  try {
    const eventId = req.params.eventId;
    await model.deleteEvent(eventId);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  //export the functions
  getOrgEvents,
  createEvent,
  deleteEvent,
};
