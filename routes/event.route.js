"use strict";
const express = require("express");
const router = express.Router();

const eventcontroller = require("../controllers/event.controller");
// set up routes to different requests/pages

router.get("/OrganizerEvents/:id", eventcontroller.getOrgEvents);
router.post("/OrganizerEvents/:id/newEvent", eventcontroller.createEvent);
router.delete("/OrganizerEvents/deleteEvent/:eventId", eventcontroller.deleteEvent);

module.exports = router;