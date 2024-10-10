const express = require("express");
const {raiseComplaint,getComplaintsByUser} = require("../controllers/complaints.controllers.js");

const router = express.Router();

router.post("/raise",raiseComplaint);

router.get("/getByUser",getComplaintsByUser);

module.exports = router;