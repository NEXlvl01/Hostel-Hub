const Complaints = require("../models/complaints.model.js");

async function raiseComplaint(req, res) {
  const { name, compType, compDetails, hostel } = req.body;

  try {
    await Complaints.create({
      name,
      complaintType: compType,
      complaintDetails: compDetails,
      createdBy: req.user.id,
      hostel,
    });

    return res.status(201).json({ message: "Complaint Registered Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(404).json("Error Occurred");
  }
}

async function getComplaintsByUser(req,res) {
  try {
    const allComplaints = await Complaints.find({createdBy: req.user.id});
    if (!allComplaints) {
      return res.json({ message: "No Complaints Yet", allComplaints });
    }
  
    return res.status(200).json({ allComplaints });
  } catch (error) {
    console.log(error);
    return res.status(400).json({error : "Error Occurred"});
  }
}

module.exports = { raiseComplaint,getComplaintsByUser };
