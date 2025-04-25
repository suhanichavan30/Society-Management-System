const express = require("express");
const router = express.Router();
const Complaint = require("../models/complaintModel.js");

router.post("/addcomplaint", async (req, res) => {
    try {
        const { title,description,owner} = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newComplaint = new Complaint({ title,description,owner });
        await newComplaint.save();

        res.status(201).json({ message: "Notice Added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/allcomplaint', async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 }); // Sort in descending order
        res.status(200).json(complaints);
    } catch (error) {
        console.error("Error fetching notices:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.delete("/deletecomplaint/:id", async (req, res) => {
    try {
        await Complaint.findByIdAndDelete(req.params.id);
        res.json({ message: "Notice deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error deleting notice" });
      }
});

module.exports=router;