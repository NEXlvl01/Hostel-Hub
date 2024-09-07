const Gatepass = require("../models/gatepass.models.js");

async function gatePassEntry(req, res) {
  const { name, applyFor, outDate, outTime, inDate, inTime, reason, hostel } =
    req.body;

  if (!applyFor || !outDate || !outTime || !inTime || !reason) {
    return res.status(400).json({ error: "All Fields Are Required" });
  }

  const existingGatePass = await Gatepass.findOne({
    outDate: outDate,
    createdBy: req.user.id,
  });

  if (existingGatePass) {
    return res
      .status(400)
      .json({ error: "Gatepass For This Date Already Exists" });
  }

  await Gatepass.create({
    name,
    leaveType: applyFor,
    outDate,
    outTime,
    inDate,
    inTime,
    reason,
    createdBy: req.user.id,
    hostel,
  });

  return res.status(201).json({ message: "Gatepass Applied Successfully" });
}

async function getAllGatepass(req, res) {
  const gatepasses = await Gatepass.find({ createdBy: req.user.id });

  if (!gatepasses) {
    return res.json({ message: "No Gatepass Yet", gatepasses });
  }

  return res.status(200).json({ gatepasses });
}

async function gatePassEdit(req, res) {
  const { applyFor, outDate, outTime, inDate, inTime, reason } = req.body;

  if (!applyFor || !outDate || !outTime || !inTime || !reason) {
    return res.status(400).json({ error: "All Fields Are Required" });
  }

  const gatepass = await Gatepass.findOne({ outDate });
  if (!gatepass) {
    return res.status(400).json({ error: "Gatepass Does Not Exist" });
  }

  await Gatepass.findOneAndUpdate(
    { outDate },
    {
      leaveType: applyFor,
      outDate,
      outTime,
      inDate,
      inTime,
      reason,
    }
  );

  return res.status(201).json({ message: "Gatepass Updated Successfully" });
}

async function fetchHostelGatepasses(req, res) {
  const hostel = req.params.hostel;
  const gatepasses = await Gatepass.find({ hostel: hostel, status: "Pending" });

  if (gatepasses.length === 0) {
    return res.json({ message: "No Gatepass Yet", gatepasses });
  }

  return res.status(200).json({ gatepasses });
}

async function approveGatepass(req, res) {
  const gatepassId = req.params.gatepassId;
  try {
    await Gatepass.findByIdAndUpdate(
      gatepassId,
      { status: "Approved", approvedOrRejectedBy: req.user.name },
      { new: true }
    );
    res.status(200).json({ message: "Gatepass approved successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to approve gatepass" });
  }
}

async function rejectGatepass(req, res) {
  const gatepassId = req.params.gatepassId;
  try {
    await Gatepass.findByIdAndUpdate(
      gatepassId,
      { status: "Rejected", approvedOrRejectedBy: req.user.name },
      { new: true }
    );
    res.status(200).json({ message: "Gatepass rejected successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to reject gatepass" });
  }
}

async function searchGatepasses(req, res) {
  const { search } = req.query;
  try {
    const gatepasses = await Gatepass.find({
      name: { $regex: search, $options: "i" },
      status: "Pending",
    });
    res.status(200).json({ gatepasses });
  } catch (error) {
    res.status(400).json({ error: "Failed to search gatepasses" });
  }
}

module.exports = {
  gatePassEntry,
  getAllGatepass,
  gatePassEdit,
  fetchHostelGatepasses,
  approveGatepass,
  rejectGatepass,
  searchGatepasses,
};
